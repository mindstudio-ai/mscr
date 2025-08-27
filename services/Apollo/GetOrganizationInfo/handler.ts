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
      'Missing API Key. Please add your Apollo API key in the connector settings.',
    );
  }

  const { organizationId, outputVariable } = inputs;

  if (!organizationId) {
    throw new Error('Organization ID is required');
  }

  log(`Retrieving organization information for ID: ${organizationId}`);

  try {
    const response = await fetch(
      `https://api.apollo.io/api/v1/organizations/${organizationId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          Accept: 'application/json',
          'api-key': apiKey,
        },
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (response.status === 403) {
        throw new Error(
          'Access forbidden. This endpoint requires a master API key and is not accessible on free plans.',
        );
      } else if (response.status === 422) {
        throw new Error('Invalid organization ID or other validation error.');
      } else {
        throw new Error(`API request failed with status: ${response.status}`);
      }
    }

    const data = await response.json();

    log('Successfully retrieved organization information');

    // Set the complete organization data as output
    setOutput(outputVariable, data);
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
