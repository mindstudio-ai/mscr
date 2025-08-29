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
    throw new Error('Missing authentication token');
  }

  const { search, page, pageSize, outputVariable } = inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (search) {
    queryParams.append('search', search);
  }
  if (page) {
    queryParams.append('page', page);
  }
  if (pageSize) {
    queryParams.append('page_size', pageSize);
  }

  const queryString = queryParams.toString();
  const url = `https://api.typeform.com/workspaces${queryString ? `?${queryString}` : ''}`;

  log('Retrieving workspaces from Typeform...');

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
          'Authentication failed. Please check your Typeform credentials.',
        );
      } else if (response.status === 403) {
        throw new Error(
          'You do not have permission to access these workspaces.',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Typeform API error (${response.status}): ${errorText}`,
        );
      }
    }

    const data = (await response.json()) as any;

    log(`Successfully retrieved ${data.items?.length || 0} workspaces`);

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving workspaces');
  }
};
