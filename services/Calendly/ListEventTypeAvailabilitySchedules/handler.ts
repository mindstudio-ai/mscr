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
    throw new Error('Missing Calendly API token');
  }

  const { eventTypeUuid, count, pageToken, outputVariable } = inputs;

  if (!eventTypeUuid) {
    throw new Error('Event Type UUID is required');
  }

  // Build the URL with query parameters
  let url = `https://api.calendly.com/event_types/${eventTypeUuid}/availability_schedules`;
  const params = new URLSearchParams();

  if (count) {
    params.append('count', count);
  }

  if (pageToken) {
    params.append('page_token', pageToken);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  log(`Retrieving availability schedules for event type: ${eventTypeUuid}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      log(
        `Error retrieving availability schedules: ${response.status} ${response.statusText}`,
      );

      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Calendly token.',
        );
      } else if (response.status === 404) {
        throw new Error(`Event type with UUID ${eventTypeUuid} not found.`);
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Calendly API error: ${response.status} ${errorText}`);
      }
    }

    const data = (await response.json()) as any;

    log(
      `Successfully retrieved ${data.collection?.length || 0} availability schedules`,
    );

    // Set the output with the full response
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving availability schedules',
    );
  }
};
