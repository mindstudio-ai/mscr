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

  // Validate required environment variables
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

  // Validate required inputs
  if (!customerId) {
    throw new Error('Customer ID is required.');
  }

  // Remove trailing slash from URL if present
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint URL
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

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const downloads = await response.json();

    // Log success message with download count
    const downloadCount = Array.isArray(downloads) ? downloads.length : 0;
    log(
      `Successfully retrieved ${downloadCount} download(s) for customer ID: ${customerId}`,
    );

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
