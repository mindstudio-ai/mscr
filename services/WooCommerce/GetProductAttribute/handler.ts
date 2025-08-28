export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate environment variables
  if (!url) {
    throw new Error(
      'Missing WooCommerce Store URL. Please check your connection settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please check your connection settings.',
    );
  }

  // Extract inputs
  const { attributeId, outputVariable } = inputs;

  if (!attributeId) {
    throw new Error('Attribute ID is required');
  }

  // Construct the API endpoint URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/products/attributes/${attributeId}`;

  log(`Retrieving product attribute with ID: ${attributeId}`);

  try {
    // Create Basic Auth credentials
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const attributeData = await response.json();

    log(`Successfully retrieved attribute: ${attributeData.name}`);

    // Set the output variable with the attribute data
    setOutput(outputVariable, attributeData);
  } catch (error) {
    // Handle any errors
    if (error instanceof Error) {
      log(`Error retrieving product attribute: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving the product attribute',
    );
  }
};
