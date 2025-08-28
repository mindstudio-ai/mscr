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

  // Validate required environment variables
  if (!url) {
    throw new Error(
      'Missing Store URL. Please configure your WooCommerce store URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce Consumer Key and Consumer Secret in the connector settings.',
    );
  }

  // Extract input variables
  const { outputVariable } = inputs;

  // Construct the API endpoint URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/data/continents`;

  log(`Fetching continents data from your WooCommerce store...`);

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
        `WooCommerce API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response
    const continents = await response.json();

    log(
      `Successfully retrieved ${continents.length} continents from WooCommerce.`,
    );

    // Set the output variable with the continents data
    setOutput(outputVariable, continents);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (error.message.includes('ENOTFOUND')) {
        throw new Error(
          `Could not connect to the WooCommerce store. Please check if the URL "${url}" is correct.`,
        );
      } else if (error.message.includes('401')) {
        throw new Error(
          'Authentication failed. Please check your WooCommerce Consumer Key and Consumer Secret.',
        );
      } else {
        throw new Error(`Error fetching continents data: ${error.message}`);
      }
    } else {
      throw new Error(
        'An unknown error occurred while fetching continents data.',
      );
    }
  }
};
