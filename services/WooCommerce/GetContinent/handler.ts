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
  if (!consumerKey || !consumerSecret) {
    throw new Error('Missing WooCommerce API credentials');
  }

  // Extract inputs
  const { continentCode, outputVariable } = inputs;

  // Normalize the URL by removing trailing slash if present
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint
  const endpoint = `${baseUrl}/wp-json/wc/v3/data/continents/${continentCode.toLowerCase()}`;

  log(`Retrieving data for continent: ${continentCode}`);

  try {
    // Create authorization header using Basic Auth
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

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const continentData = await response.json();

    log(
      `Successfully retrieved data for ${continentData.name} (${continentData.code})`,
    );
    log(
      `Found ${continentData.countries?.length || 0} countries in this continent`,
    );

    // Set the output variable with the continent data
    setOutput(outputVariable, continentData);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error retrieving continent data: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};
