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
    throw new Error('Missing WooCommerce store URL');
  }
  if (!consumerKey) {
    throw new Error('Missing WooCommerce API Consumer Key');
  }
  if (!consumerSecret) {
    throw new Error('Missing WooCommerce API Consumer Secret');
  }

  // Extract inputs
  const { taxRateId, confirmDeletion, outputVariable } = inputs;

  // Validate inputs
  if (!taxRateId) {
    throw new Error('Tax Rate ID is required');
  }

  // Check confirmation
  if (confirmDeletion !== 'true') {
    throw new Error(
      'Deletion not confirmed. Please confirm deletion to proceed.',
    );
  }

  // Prepare the API URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const apiUrl = `${baseUrl}/wp-json/wc/v3/taxes/${taxRateId}?force=true`;

  // Create authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Deleting tax rate with ID: ${taxRateId}`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to delete tax rate: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse and return the response
    const deletedTaxRate = await response.json();

    log(
      `Successfully deleted tax rate "${deletedTaxRate.name}" (ID: ${deletedTaxRate.id})`,
    );

    // Set the output
    setOutput(outputVariable, deletedTaxRate);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while deleting the tax rate');
  }
};
