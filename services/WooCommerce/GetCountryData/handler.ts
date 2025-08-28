import fetch from 'node-fetch';

export const handler = async ({
  inputs,
  setOutput,
  log,
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
      'Missing WooCommerce store URL. Please configure the "url" environment variable.',
    );
  }
  if (!consumerKey) {
    throw new Error(
      'Missing WooCommerce API Consumer Key. Please configure the "consumerKey" environment variable.',
    );
  }
  if (!consumerSecret) {
    throw new Error(
      'Missing WooCommerce API Consumer Secret. Please configure the "consumerSecret" environment variable.',
    );
  }

  // Extract inputs
  const { countryCode, outputVariable } = inputs;

  // Validate inputs
  if (!countryCode) {
    throw new Error(
      'Missing country code. Please provide a valid ISO3166 alpha-2 country code.',
    );
  }

  // Construct the API URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const apiUrl = `${baseUrl}/wp-json/wc/v3/data/countries/${countryCode.toLowerCase()}`;

  log(`Retrieving country data for: ${countryCode}`);

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
        `Failed to retrieve country data: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const countryData = await response.json();

    log(
      `Successfully retrieved data for ${countryData.name} (${countryData.code})`,
    );

    if (countryData.states) {
      log(
        `Found ${countryData.states.length} states/provinces for this country`,
      );
    }

    // Set the output variable
    setOutput(outputVariable, countryData);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving country data');
  }
};
