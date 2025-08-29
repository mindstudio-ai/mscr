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
      'Missing authentication token. Please check your Calendly connection.',
    );
  }

  const { eventUuid, reason, outputVariable } = inputs;

  if (!eventUuid) {
    throw new Error('Event UUID is required');
  }

  log(`Preparing to delete Calendly event with UUID: ${eventUuid}`);

  // Prepare request options
  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  // Add reason in request body if provided
  if (reason) {
    log(`Cancellation reason provided: "${reason}"`);
    requestOptions.body = JSON.stringify({ reason });
  }

  try {
    // Make the API request to delete the event
    const response = await fetch(
      `https://api.calendly.com/scheduled_events/${eventUuid}`,
      requestOptions,
    );

    // Handle response based on status code
    if (response.ok) {
      log('Event successfully deleted');
      setOutput(outputVariable, {
        success: true,
        message: 'Event successfully deleted',
      });
    } else {
      // Handle different error status codes
      let errorMessage = '';

      switch (response.status) {
        case 401:
          errorMessage =
            'Authentication failed. Please check your Calendly connection.';
          break;
        case 403:
          errorMessage = "You don't have permission to delete this event.";
          break;
        case 404:
          errorMessage = 'Event not found. Please check the Event UUID.';
          break;
        case 429:
          errorMessage = 'Rate limit exceeded. Please try again later.';
          break;
        default:
          errorMessage = `Calendly API error: ${response.status} ${response.statusText}`;
      }

      log(`Error: ${errorMessage}`);
      setOutput(outputVariable, {
        success: false,
        message: errorMessage,
        statusCode: response.status,
      });
    }
  } catch (error) {
    // Handle network or other unexpected errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error: ${errorMessage}`);
    setOutput(outputVariable, {
      success: false,
      message: `Failed to delete event: ${errorMessage}`,
    });
  }
};
