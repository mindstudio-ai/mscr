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

  const { eventTypeUuid, outputVariable } = inputs;
  if (!eventTypeUuid) {
    throw new Error('Event Type UUID is required');
  }

  log(`Fetching hosts for event type: ${eventTypeUuid}`);

  try {
    const response = await fetch(
      `https://api.calendly.com/event_types/${eventTypeUuid}/hosts`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Event type with UUID ${eventTypeUuid} not found`);
      } else if (response.status === 401 || response.status === 403) {
        throw new Error(
          'Authentication failed. Please check your Calendly connection.',
        );
      }
      throw new Error(
        `Calendly API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = (await response.json()) as any;

    if (!data.collection) {
      throw new Error('Unexpected response format from Calendly API');
    }

    log(`Successfully retrieved ${data.collection.length} hosts`);

    // Extract the hosts from the response
    const hosts = data.collection.map((host: any) => ({
      uri: host.uri,
      user: host.user
        ? {
            uri: host.user.uri,
            name: host.user.name,
            email: host.user.email,
          }
        : null,
    }));

    // Set the output variable with the hosts data
    setOutput(outputVariable, hosts);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};
