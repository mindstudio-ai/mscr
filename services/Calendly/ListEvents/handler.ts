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
      'Missing authentication token. Please check your Calendly connection.',
    );
  }

  const { minStartTime, maxStartTime, status, count, outputVariable } = inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (minStartTime) {
    queryParams.append('min_start_time', minStartTime);
  }

  if (maxStartTime) {
    queryParams.append('max_start_time', maxStartTime);
  }

  if (status) {
    queryParams.append('status', status);
  }

  if (count) {
    queryParams.append('count', count);
  }

  // Construct the API URL
  const apiUrl = `https://api.calendly.com/scheduled_events?${queryParams.toString()}`;

  log('Fetching events from Calendly...');

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Calendly API error (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as any;

    if (!data.collection) {
      log('No events found matching your criteria');
      setOutput(outputVariable, []);
      return;
    }

    const events = data.collection.map((event: any) => ({
      id: event.uri.split('/').pop(),
      uri: event.uri,
      name: event.name,
      status: event.status,
      startTime: event.start_time,
      endTime: event.end_time,
      location: event.location,
      createdAt: event.created_at,
      updatedAt: event.updated_at,
      eventType: event.event_type,
      inviteesCounter: event.invitees_counter,
      eventMemberships: event.event_memberships,
    }));

    log(`Successfully retrieved ${events.length} events`);
    setOutput(outputVariable, events);
  } catch (error) {
    log(`Error retrieving Calendly events: ${(error as Error).message}`);
    throw error;
  }
};
