export const handler = async ({
  inputs,
  setOutput,
  log,
  uploadFile,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Calendly connection settings.',
    );
  }

  const { eventUuid, outputVariable } = inputs;
  if (!eventUuid) {
    throw new Error('Event UUID is required');
  }

  // Validate UUID format (basic validation)
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(eventUuid)) {
    throw new Error(
      'Invalid Event UUID format. UUID should be in the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    );
  }

  log(`Retrieving details for Calendly event: ${eventUuid}`);

  try {
    // Make request to Calendly API
    const response = await fetch(
      `https://api.calendly.com/scheduled_events/${eventUuid}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 404) {
        throw new Error(
          `Event not found. Please check the Event UUID and try again.`,
        );
      } else if (response.status === 401) {
        throw new Error(
          `Authentication failed. Please check your Calendly connection settings.`,
        );
      } else {
        throw new Error(
          `Calendly API error (${response.status}): ${errorText}`,
        );
      }
    }

    // Parse the response
    const eventData = (await response.json()) as any;

    log('Successfully retrieved event details');

    // Set the output variable with the event data
    setOutput(outputVariable, eventData);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to retrieve Calendly event: ${String(error)}`);
  }
};
