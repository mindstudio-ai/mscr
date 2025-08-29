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
      'Missing authentication token. Please reconnect your Calendly account.',
    );
  }

  const { groupUri, count, pageToken, outputVariable } = inputs;

  if (!groupUri) {
    throw new Error('Group URI is required');
  }

  // Build the query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('group', groupUri);

  if (count) {
    const countNum = parseInt(count, 10);
    if (isNaN(countNum) || countNum < 1 || countNum > 100) {
      throw new Error('Count must be a number between 1 and 100');
    }
    queryParams.append('count', count);
  }

  if (pageToken) {
    queryParams.append('page_token', pageToken);
  }

  const url = `https://api.calendly.com/group_memberships?${queryParams.toString()}`;

  log(`Fetching group relationships for ${groupUri}...`);

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
          'Authentication failed. Please reconnect your Calendly account.',
        );
      } else if (response.status === 403) {
        throw new Error('You do not have permission to access this group.');
      } else if (response.status === 404) {
        throw new Error('Group not found. Please check the Group URI.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Calendly API error (${response.status}): ${errorText}`,
        );
      }
    }

    const data = (await response.json()) as {
      collection: any[];
      pagination: {
        count: number;
        next_page: string | null;
        next_page_token: string | null;
        previous_page: string | null;
        previous_page_token: string | null;
      };
    };

    log(`Successfully retrieved ${data.collection.length} group relationships`);

    // If pagination is available, log information to help users
    if (data.pagination.next_page_token) {
      log(
        `There are more results available. Use the page token in the pagination options to retrieve the next page.`,
      );
    }

    setOutput(outputVariable, {
      collection: data.collection,
      pagination: data.pagination,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to fetch group relationships: ${String(error)}`);
  }
};
