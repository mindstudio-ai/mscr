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
    throw new Error(
      'Missing authentication token. Please check your connection settings.',
    );
  }

  const { assetId, outputVariable } = inputs;
  if (!assetId) {
    throw new Error('Asset ID is required');
  }

  log(`Retrieving information for Canva asset: ${assetId}`);

  try {
    // Make the API request to Canva
    const response = await fetch(
      `https://api.canva.com/rest/v1/assets/${assetId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error || response.statusText || 'Unknown error';

      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Canva API token.',
        );
      } else if (response.status === 404) {
        throw new Error(`Asset not found: ${assetId}`);
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Failed to retrieve asset: ${errorMessage} (${response.status})`,
        );
      }
    }

    // Parse the response
    const data = (await response.json()) as any;

    log(
      `Successfully retrieved information for asset: ${data.asset?.name || assetId}`,
    );

    // Set the output variable with the asset information
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`An unexpected error occurred: ${String(error)}`);
    }
  }
};
