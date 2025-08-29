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
      'Missing authentication token. Please check your connection settings.',
    );
  }

  const { accountId, search, page, pageSize, outputVariable } = inputs;

  if (!accountId) {
    throw new Error('Account ID is required');
  }

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

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : '';

  const url = `https://api.typeform.com/accounts/${accountId}/workspaces${queryString}`;

  log(`Retrieving workspaces for account ${accountId}...`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Unauthorized. Please check your authentication token.',
        );
      } else if (response.status === 404) {
        throw new Error(`Account with ID ${accountId} not found.`);
      } else {
        const errorText = await response.text();
        throw new Error(
          `API request failed with status ${response.status}: ${errorText}`,
        );
      }
    }

    const data = (await response.json()) as any;

    log(`Successfully retrieved ${data.total_items} workspaces.`);

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error retrieving workspaces: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while retrieving workspaces');
  }
};
