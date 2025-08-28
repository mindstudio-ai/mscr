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
  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate environment variables
  if (!url) {
    throw new Error(
      'Store URL is required. Please configure it in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'WooCommerce API credentials (Consumer Key and Consumer Secret) are required.',
    );
  }

  // Extract inputs
  const { taxRateId, outputVariable } = inputs;

  if (!taxRateId) {
    throw new Error('Tax Rate ID is required.');
  }

  // Construct the API URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const apiUrl = `${baseUrl}/wp-json/wc/v3/taxes/${taxRateId}`;

  // Create authorization header using Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Retrieving tax rate with ID: ${taxRateId}`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to retrieve tax rate: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const taxRate = await response.json();

    log(`Successfully retrieved tax rate: ${taxRate.name}`);

    // Set the output variable
    setOutput(outputVariable, taxRate);
  } catch (error) {
    // Handle any errors that occurred during the API request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving the tax rate');
  }
};
