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

  const { eventUuid, inviteeUuid, outputVariable } = inputs;

  // Validate required inputs
  if (!eventUuid) {
    throw new Error('Event UUID is required');
  }

  if (!inviteeUuid) {
    throw new Error('Invitee UUID is required');
  }

  log(
    `Deleting invitee data for invitee ${inviteeUuid} from event ${eventUuid}`,
  );

  try {
    // Make the DELETE request to Calendly API
    const response = await fetch(
      `https://api.calendly.com/scheduled_events/${eventUuid}/invitees/${inviteeUuid}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Check if the request was successful
    if (response.status === 204) {
      log('Successfully deleted invitee data');

      // Set the output variable with success information
      setOutput(outputVariable, {
        success: true,
        message: 'Invitee data successfully deleted',
      });
    } else {
      // Handle error responses
      const errorText = await response.text();
      let errorMessage = `Failed to delete invitee data. Status: ${response.status}`;

      try {
        // Try to parse error response as JSON
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch (e) {
        // If not JSON, use the text response
        if (errorText) {
          errorMessage += ` - ${errorText}`;
        }
      }

      throw new Error(errorMessage);
    }
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
