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

  const { count, pageToken, sort, outputVariable } = inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (count) {
    queryParams.append('count', count);
  }

  if (pageToken) {
    queryParams.append('page_token', pageToken);
  }

  if (sort) {
    queryParams.append('sort', sort);
  }

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : '';
  const url = `https://api.calendly.com/routing_forms${queryString}`;

  log('Fetching routing forms from Calendly...');

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

      // Handle common error codes with user-friendly messages
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Calendly connection.',
        );
      } else if (response.status === 403) {
        throw new Error("You don't have permission to access routing forms.");
      } else if (response.status === 404) {
        throw new Error(
          'Routing forms endpoint not found. This feature may not be available in your Calendly plan.',
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

    log(`Successfully retrieved ${data.collection?.length || 0} routing forms`);

    // If pagination is available, log it to help users
    if (data.pagination?.next_page_token) {
      log(
        'More routing forms are available. Use the page token from the response to fetch the next page.',
      );
    }

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`An unexpected error occurred: ${String(error)}`);
    }
  }
};
