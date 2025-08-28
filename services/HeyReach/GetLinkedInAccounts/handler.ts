export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API Key in the connector settings.',
    );
  }

  // Extract inputs
  const { keyword, limit, offset, outputVariable } = inputs;

  // Parse numeric inputs (ensuring they're numbers even if provided as strings)
  const parsedLimit = parseInt(limit, 10);
  const parsedOffset = parseInt(offset, 10);

  // Validate inputs
  if (isNaN(parsedLimit) || parsedLimit <= 0 || parsedLimit > 100) {
    throw new Error('Limit must be a number between 1 and 100');
  }

  if (isNaN(parsedOffset) || parsedOffset < 0) {
    throw new Error('Offset must be a non-negative number');
  }

  // Prepare request body
  const requestBody = {
    keyword: keyword || '',
    limit: parsedLimit,
    offset: parsedOffset,
  };

  log(
    `Fetching LinkedIn accounts from HeyReach${keyword ? ` matching "${keyword}"` : ''}`,
  );
  log(
    `Retrieving up to ${parsedLimit} accounts starting from offset ${parsedOffset}`,
  );

  try {
    // Make API request
    const response = await fetch(
      'https://api.heyreach.io/api/public/li_account/GetAll',
      {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          Accept: 'text/plain',
        },
        body: JSON.stringify(requestBody),
      },
    );

    // Handle response status
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Unauthorized: Invalid API key or insufficient permissions',
        );
      } else if (response.status === 429) {
        throw new Error(
          'Rate limit exceeded: Too many requests. Please try again later.',
        );
      } else {
        throw new Error(`API request failed with status: ${response.status}`);
      }
    }

    // Parse response
    const data = await response.json();

    log(
      `Successfully retrieved ${data.items.length} LinkedIn accounts (total available: ${data.totalCount})`,
    );

    // Set output
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while fetching LinkedIn accounts',
    );
  }
};
