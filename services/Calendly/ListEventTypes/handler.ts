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
    throw new Error('Missing Calendly authentication token');
  }

  const { user, active, count, pageToken, outputVariable } = inputs;

  // Build the query parameters
  const queryParams = new URLSearchParams();

  // Add user parameter if provided
  if (user) {
    queryParams.append('user', user);
  }

  // Add active parameter if provided
  if (active !== undefined && active !== '') {
    queryParams.append('active', active);
  }

  // Add count parameter if provided
  if (count) {
    queryParams.append('count', count);
  }

  // Add page token parameter if provided
  if (pageToken) {
    queryParams.append('page_token', pageToken);
  }

  // Construct the URL with query parameters
  const url = `https://api.calendly.com/event_types${
    queryParams.toString() ? `?${queryParams.toString()}` : ''
  }`;

  log('Fetching event types from Calendly...');

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

      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Calendly token.',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Calendly API error (${response.status}): ${errorText}`,
        );
      }
    }

    const data = (await response.json()) as any;

    log(`Successfully retrieved ${data.collection.length} event types`);

    // Set the output with the event types collection and pagination info
    setOutput(outputVariable, {
      collection: data.collection,
      pagination: data.pagination,
    });
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching event types');
  }
};
