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

  const { userUuid, startTime, endTime, outputVariable } = inputs;

  if (!userUuid) {
    throw new Error('User UUID is required');
  }

  if (!startTime) {
    throw new Error('Start time is required');
  }

  if (!endTime) {
    throw new Error('End time is required');
  }

  log(
    `Retrieving busy times for user ${userUuid} from ${startTime} to ${endTime}`,
  );

  try {
    // Construct the API URL with query parameters
    const url = new URL('https://api.calendly.com/user_busy_times');
    url.searchParams.append(
      'user',
      `https://api.calendly.com/users/${userUuid}`,
    );
    url.searchParams.append('start_time', startTime);
    url.searchParams.append('end_time', endTime);

    // Make the API request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();

      // Handle common error cases with user-friendly messages
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Calendly connection.',
        );
      } else if (response.status === 404) {
        throw new Error(
          `User with UUID ${userUuid} not found. Please verify the UUID.`,
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Calendly API error (${response.status}): ${errorText}`,
        );
      }
    }

    // Parse the response
    const data = (await response.json()) as any;

    // Process the busy times data to make it more user-friendly
    const busyTimes = data.collection.map((item: any) => ({
      id: item.id,
      startTime: item.start_time,
      endTime: item.end_time,
      type: item.busy_type,
      title: item.title || 'Busy',
      source: item.calendar_event_details?.calendar_type || 'Calendly',
    }));

    log(`Found ${busyTimes.length} busy time periods`);

    // Set the output variable with the processed busy times
    setOutput(outputVariable, busyTimes);
  } catch (error) {
    // Catch and rethrow any errors that weren't handled above
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`An unexpected error occurred: ${error}`);
    }
  }
};
