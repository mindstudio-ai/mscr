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

  const { page, pageSize, outputVariable } = inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (page) {
    queryParams.append('page', page);
  }
  if (pageSize) {
    queryParams.append('page_size', pageSize);
  }

  const queryString = queryParams.toString();
  const url = `https://api.typeform.com/themes${queryString ? `?${queryString}` : ''}`;

  log(
    `Retrieving themes from Typeform (page ${page || '1'}, ${pageSize || '10'} per page)...`,
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
      const errorText = await response.text();

      // Handle common error codes with helpful messages
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Typeform credentials.',
        );
      } else if (response.status === 403) {
        throw new Error('You do not have permission to access these themes.');
      } else if (response.status === 404) {
        throw new Error('The requested resource was not found.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (response.status >= 500) {
        throw new Error(
          `Typeform server error (${response.status}): ${errorText}`,
        );
      } else {
        throw new Error(
          `Error retrieving themes: ${response.status} ${errorText}`,
        );
      }
    }

    const data = (await response.json()) as any;

    log(
      `Successfully retrieved ${data.items?.length || 0} themes (page ${page || '1'} of ${data.page_count || '1'})`,
    );

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving themes');
  }
};
