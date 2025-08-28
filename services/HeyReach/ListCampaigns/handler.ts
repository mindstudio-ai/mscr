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
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API Key in the service settings.',
    );
  }

  const { keyword, statuses, accountIds, limit, offset, outputVariable } =
    inputs;

  // Prepare request body
  const requestBody: Record<string, any> = {};

  // Add pagination parameters
  requestBody.offset = offset ? parseInt(offset, 10) : 0;
  requestBody.limit = limit ? parseInt(limit, 10) : 10;

  // Add optional filters if provided
  if (keyword) {
    requestBody.keyword = keyword;
  }

  // Handle statuses (can be a single value or array)
  if (statuses) {
    if (typeof statuses === 'string' && !statuses.includes(',')) {
      requestBody.statuses = [statuses];
    } else if (typeof statuses === 'string') {
      requestBody.statuses = statuses.split(',').map((s) => s.trim());
    } else if (Array.isArray(statuses)) {
      requestBody.statuses = statuses;
    }
  }

  // Handle account IDs (convert comma-separated string to array of integers)
  if (accountIds) {
    if (typeof accountIds === 'string' && accountIds.includes(',')) {
      requestBody.accountIds = accountIds
        .split(',')
        .map((id) => parseInt(id.trim(), 10));
    } else if (typeof accountIds === 'string') {
      requestBody.accountIds = [parseInt(accountIds.trim(), 10)];
    } else if (Array.isArray(accountIds)) {
      requestBody.accountIds = accountIds.map((id) =>
        typeof id === 'string' ? parseInt(id, 10) : id,
      );
    }
  }

  log(
    `Retrieving campaigns from HeyReach${keyword ? ` matching "${keyword}"` : ''}...`,
  );

  try {
    const response = await fetch(
      'https://api.heyreach.io/api/public/campaign/GetAll',
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

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Unauthorized: Invalid API key or insufficient permissions.',
        );
      } else if (response.status === 404) {
        throw new Error(
          'Resource not found. Please check your request parameters.',
        );
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else {
        throw new Error(`API request failed with status: ${response.status}`);
      }
    }

    const data = await response.json();
    log(
      `Successfully retrieved ${data.items?.length || 0} campaigns out of ${data.totalCount || 0} total.`,
    );

    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error retrieving campaigns: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
