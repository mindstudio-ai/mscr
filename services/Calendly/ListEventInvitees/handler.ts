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
  // Extract token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please reconnect your Calendly account.',
    );
  }

  // Extract inputs
  const { eventUuid, count = '25', pageToken, outputVariable } = inputs;

  if (!eventUuid) {
    throw new Error('Event UUID is required');
  }

  // Construct the URL with query parameters
  let url = `https://api.calendly.com/scheduled_events/${eventUuid}/invitees?count=${count}`;
  if (pageToken) {
    url += `&page_token=${encodeURIComponent(pageToken)}`;
  }

  log(`Fetching invitees for event: ${eventUuid}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to fetch invitees: ${response.status} ${response.statusText}`;

      // Add more context based on common error codes
      if (response.status === 401) {
        errorMessage =
          'Authentication failed. Please reconnect your Calendly account.';
      } else if (response.status === 403) {
        errorMessage =
          "You don't have permission to access this event's invitees.";
      } else if (response.status === 404) {
        errorMessage = 'Event not found. Please check the Event UUID.';
      }

      throw new Error(`${errorMessage}\n${errorText}`);
    }

    // Parse the response
    const data = (await response.json()) as any;

    log(`Successfully retrieved ${data.collection?.length || 0} invitees`);

    // Add a helpful message about pagination
    if (data.pagination?.next_page_token) {
      log(
        'More invitees are available. Use the page token from the results to fetch the next page.',
      );
    }

    // Set the output
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      throw new Error(`Error fetching Calendly invitees: ${error.message}`);
    } else {
      throw new Error(
        `Unknown error occurred while fetching Calendly invitees`,
      );
    }
  }
};
