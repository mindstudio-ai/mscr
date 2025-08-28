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

  // Validate required environment variables
  if (!url) {
    throw new Error(
      'Missing WooCommerce Store URL. Please configure the URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please configure the Consumer Key and Consumer Secret in the connector settings.',
    );
  }

  // Extract input variables
  const { outputVariable } = inputs;

  // Normalize the base URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint
  const endpoint = `${baseUrl}/wp-json/wc/v3/data/continents`;

  log(`Fetching continents data from your WooCommerce store...`);

  try {
    // Create the authorization header using Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const continentsData = await response.json();

    // Validate response format
    if (!Array.isArray(continentsData)) {
      throw new Error(
        'Unexpected response format. Expected an array of continents.',
      );
    }

    log(
      `Successfully retrieved ${continentsData.length} continents with their countries and states.`,
    );

    // Set the output variable
    setOutput(outputVariable, continentsData);
  } catch (error) {
    // Handle any errors that occurred during the API call
    if (error instanceof Error) {
      log(`Error fetching continents data: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while fetching continents data');
  }
};
