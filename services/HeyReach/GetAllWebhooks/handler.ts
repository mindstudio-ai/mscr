export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Get API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please check your HeyReach API key configuration.',
    );
  }

  // Extract and validate inputs
  const { offset = '0', limit = '100', outputVariable } = inputs;

  // Convert string inputs to numbers
  const offsetNum = parseInt(offset, 10);
  const limitNum = parseInt(limit, 10);

  // Validate numeric inputs
  if (isNaN(offsetNum) || offsetNum < 0) {
    throw new Error('Offset must be a non-negative number');
  }

  if (isNaN(limitNum) || limitNum <= 0 || limitNum > 100) {
    throw new Error('Limit must be a positive number between 1 and 100');
  }

  // Prepare request body
  const requestBody = {
    offset: offsetNum,
    limit: limitNum,
  };

  log(`Fetching webhooks (offset: ${offsetNum}, limit: ${limitNum})...`);

  try {
    // Make API request to HeyReach
    const response = await fetch(
      'https://api.heyreach.io/api/public/webhooks/GetAllWebhooks',
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

    // Handle non-successful responses
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HeyReach API error (${response.status}): ${errorText}`);
    }

    // Parse response
    const data = await response.json();

    log(
      `Successfully retrieved ${data.items?.length || 0} webhooks out of ${data.totalCount || 0} total`,
    );

    // Set output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    log('Failed to retrieve webhooks');
    throw error;
  }
};
