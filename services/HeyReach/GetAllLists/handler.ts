export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Get API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API Key in the connector settings.',
    );
  }

  // Extract inputs with defaults
  const {
    keyword = '',
    listType = '',
    offset = '0',
    limit = '10',
    outputVariable,
  } = inputs;

  // Validate pagination parameters
  const offsetNum = parseInt(offset, 10);
  const limitNum = parseInt(limit, 10);

  if (isNaN(offsetNum)) {
    throw new Error('Offset must be a valid number');
  }

  if (isNaN(limitNum)) {
    throw new Error('Limit must be a valid number');
  }

  if (limitNum > 100) {
    log('Warning: Maximum limit is 100. Using 100 as the limit.');
  }

  // Prepare request payload
  const payload: Record<string, any> = {
    offset: offsetNum,
    limit: Math.min(limitNum, 100), // Ensure limit doesn't exceed 100
  };

  // Add optional filters if provided
  if (keyword) {
    payload.keyword = keyword;
  }

  if (listType) {
    payload.listType = listType;
  }

  log(
    `Fetching lists from HeyReach${keyword ? ` with keyword "${keyword}"` : ''}...`,
  );

  try {
    // Make API request
    const response = await fetch(
      'https://api.heyreach.io/api/public/list/GetAll',
      {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    // Handle HTTP errors
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid API key');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `API request failed with status ${response.status}: ${response.statusText}`,
        );
      }
    }

    // Parse response
    const data = await response.json();

    log(
      `Successfully retrieved ${data.items?.length || 0} lists out of ${data.totalCount || 0} total`,
    );

    // Set output
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};
