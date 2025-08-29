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
    throw new Error('Missing authentication token');
  }

  const { eventTypeUuid, outputVariable } = inputs;
  if (!eventTypeUuid) {
    throw new Error('Event Type UUID is required');
  }

  log(`Retrieving event type details for UUID: ${eventTypeUuid}`);

  try {
    const response = await fetch(
      `https://api.calendly.com/event_types/${eventTypeUuid}`,
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
        throw new Error(`Event type not found with UUID: ${eventTypeUuid}`);
      } else if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Calendly access token.',
        );
      } else {
        throw new Error(
          `Calendly API error (${response.status}): ${errorText}`,
        );
      }
    }

    const data = (await response.json()) as any;
    log('Successfully retrieved event type details');

    // Set the entire response as the output
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to retrieve event type: ${String(error)}`);
  }
};
