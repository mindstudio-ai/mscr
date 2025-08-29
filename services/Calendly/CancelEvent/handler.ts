export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please reconnect your Calendly account.',
    );
  }

  const { eventUuid, reason, outputVariable } = inputs;

  if (!eventUuid) {
    throw new Error('Event UUID is required');
  }

  log(`Preparing to cancel Calendly event: ${eventUuid}`);

  // Prepare request options
  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  // Add reason to request body if provided
  if (reason) {
    log(`Cancellation reason: ${reason}`);
    requestOptions.body = JSON.stringify({ reason });
  }

  try {
    // Make API request to cancel the event
    const response = await fetch(
      `https://api.calendly.com/scheduled_events/${eventUuid}`,
      requestOptions,
    );

    // Handle response
    if (response.ok) {
      log('Event successfully cancelled');
      setOutput(outputVariable, {
        success: true,
        message: 'Event successfully cancelled',
      });
    } else {
      // Handle error responses
      let errorMessage = `Failed to cancel event. Status: ${response.status}`;

      if (response.status === 404) {
        errorMessage = 'Event not found. Please check the UUID and try again.';
      } else if (response.status === 403) {
        errorMessage =
          'Permission denied. You may not have access to cancel this event.';
      } else if (response.status === 401) {
        errorMessage =
          'Authentication failed. Please reconnect your Calendly account.';
      }

      try {
        // Try to get more detailed error information
        const errorData = (await response.json()) as any;
        if (errorData.message) {
          errorMessage += ` - ${errorData.message}`;
        }
      } catch (e) {
        // If we can't parse the error response, just use the status-based message
      }

      log(`Error: ${errorMessage}`);
      setOutput(outputVariable, {
        success: false,
        message: errorMessage,
      });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error: ${errorMessage}`);
    setOutput(outputVariable, {
      success: false,
      message: `Failed to cancel event: ${errorMessage}`,
    });
  }
};
