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
    throw new Error('Missing authentication token');
  }

  const { count, pageToken, outputVariable } = inputs;

  // Build URL with query parameters
  let url = 'https://api.calendly.com/organization_memberships/groups';
  const queryParams = new URLSearchParams();

  if (count) {
    queryParams.append('count', count);
  }

  if (pageToken) {
    queryParams.append('page_token', pageToken);
  }

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }

  log('Fetching groups from Calendly...');

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
      log(`Error from Calendly API: ${response.status} ${response.statusText}`);

      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Calendly credentials.',
        );
      } else if (response.status === 403) {
        throw new Error('You do not have permission to access these groups.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Calendly API error: ${response.status} ${errorText}`);
      }
    }

    const data = (await response.json()) as any;

    // Format the response
    const result = {
      groups: data.collection || [],
      pagination: {
        count: data.pagination?.count,
        next_page: data.pagination?.next_page,
        next_page_token: data.pagination?.next_page_token,
        previous_page: data.pagination?.previous_page,
        previous_page_token: data.pagination?.previous_page_token,
      },
    };

    log(`Successfully retrieved ${result.groups.length} groups`);

    // Set the output
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};
