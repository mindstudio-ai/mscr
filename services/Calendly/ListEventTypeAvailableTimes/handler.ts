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

  const { eventTypeUuid, startTime, endTime, timezone, outputVariable } =
    inputs;

  if (!eventTypeUuid) {
    throw new Error('Event Type UUID is required');
  }

  if (!startTime) {
    throw new Error('Start Time is required');
  }

  if (!endTime) {
    throw new Error('End Time is required');
  }

  // Build the URL with query parameters
  let url = `https://api.calendly.com/event_types/${eventTypeUuid}/available_times?start_time=${encodeURIComponent(startTime)}&end_time=${encodeURIComponent(endTime)}`;

  // Add timezone if provided
  if (timezone) {
    url += `&timezone=${encodeURIComponent(timezone)}`;
  }

  log(`Fetching available times for event type ${eventTypeUuid}`);
  log(
    `Date range: ${new Date(startTime).toLocaleDateString()} to ${new Date(endTime).toLocaleDateString()}`,
  );

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = (await response.json()) as any;
      const errorMessage =
        errorData.message || `Error: ${response.status} ${response.statusText}`;
      throw new Error(`Calendly API error: ${errorMessage}`);
    }

    const data = (await response.json()) as any;

    // Extract the available times from the response
    const availableTimes = data.collection || [];

    log(`Found ${availableTimes.length} available time slots`);

    // Set the output variable with the available times
    setOutput(outputVariable, availableTimes);
  } catch (error) {
    if (error instanceof Error) {
      // Handle specific error cases
      if (error.message.includes('404')) {
        throw new Error(
          `Event type with UUID ${eventTypeUuid} not found. Please check the UUID and try again.`,
        );
      } else if (error.message.includes('401')) {
        throw new Error(
          'Authentication failed. Please check your Calendly connection.',
        );
      } else if (error.message.includes('403')) {
        throw new Error(
          'You do not have permission to access this event type.',
        );
      } else if (error.message.includes('date range')) {
        throw new Error(
          'The date range is too large. Please select a smaller date range.',
        );
      } else {
        throw error;
      }
    } else {
      throw new Error(
        'An unexpected error occurred while fetching available times.',
      );
    }
  }
};
