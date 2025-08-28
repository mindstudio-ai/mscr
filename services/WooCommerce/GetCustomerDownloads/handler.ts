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
  // Extract inputs
  const { customerId, outputVariable } = inputs;

  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate required inputs and environment variables
  if (!customerId) {
    throw new Error('Customer ID is required');
  }

  if (!url) {
    throw new Error('WooCommerce Store URL is not configured');
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error('WooCommerce API credentials are not configured');
  }

  // Construct the API URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const apiUrl = `${baseUrl}/wp-json/wc/v3/customers/${customerId}/downloads`;

  log(`Retrieving downloads for customer ID: ${customerId}`);

  try {
    // Create authorization header for Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    const downloads = await response.json();

    if (!Array.isArray(downloads)) {
      throw new Error('Unexpected response format from WooCommerce API');
    }

    log(`Successfully retrieved ${downloads.length} download(s) for customer`);

    // Set the output variable with the downloads data
    setOutput(outputVariable, downloads);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error retrieving customer downloads: ${error.message}`);
      throw error;
    }
    throw new Error(
      'Unknown error occurred while retrieving customer downloads',
    );
  }
};
