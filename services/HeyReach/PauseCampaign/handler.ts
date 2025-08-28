export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API Key in the connector settings.',
    );
  }

  const { campaignId, outputVariable } = inputs;

  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  log(`Pausing campaign with ID: ${campaignId}`);

  try {
    const response = await fetch(
      `https://api.heyreach.io/api/public/campaign/Pause?campaignId=${campaignId}`,
      {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          Accept: 'text/plain',
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.errorMessage || 'Unknown error';

      switch (response.status) {
        case 400:
          throw new Error(`Bad Request: ${errorMessage}`);
        case 401:
          throw new Error('Unauthorized: Invalid API key');
        case 404:
          throw new Error(`Campaign not found: ${errorMessage}`);
        case 429:
          throw new Error('Too many requests: Rate limit exceeded');
        default:
          throw new Error(
            `Request failed with status ${response.status}: ${errorMessage}`,
          );
      }
    }

    const data = await response.json();
    log('Campaign paused successfully');

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};
