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
  // Extract inputs
  const { listId, outputVariable } = inputs;

  // Validate required environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API Key in the service settings.',
    );
  }

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  log(`Retrieving list with ID: ${listId}`);

  try {
    // Prepare the request URL with query parameters
    const url = `https://api.heyreach.io/api/public/list/GetById?listId=${encodeURIComponent(listId)}`;

    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': apiKey,
        Accept: 'text/plain',
      },
    });

    // Handle different response statuses
    if (response.status === 401) {
      throw new Error('Unauthorized: Invalid API key');
    } else if (response.status === 404) {
      throw new Error(`List with ID ${listId} not found`);
    } else if (response.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    // Parse the response
    const listData = await response.json();

    log(`Successfully retrieved list: ${listData.name}`);

    // Set the output variable with the list data
    setOutput(outputVariable, listData);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};
