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
      'Missing WooCommerce Store URL. Please check your connection settings.',
    );
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please check your connection settings.',
    );
  }

  // Extract inputs
  const { currencyCode, outputVariable } = inputs;

  // Validate inputs
  if (!currencyCode) {
    throw new Error('Currency code is required');
  }

  // Normalize the currency code (API is case-insensitive)
  const normalizedCurrencyCode = currencyCode.toLowerCase();

  // Remove trailing slash from URL if present
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint
  const endpoint = `${baseUrl}/wp-json/wc/v3/data/currencies/${normalizedCurrencyCode}`;

  log(`Retrieving data for currency: ${currencyCode}`);

  try {
    // Create authorization header for Basic Auth
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
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    log(`Successfully retrieved data for ${data.code} (${data.name})`);

    // Set the output variable
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (
        error.message.includes('ENOTFOUND') ||
        error.message.includes('ETIMEDOUT')
      ) {
        throw new Error(
          `Could not connect to WooCommerce store at ${url}. Please check your store URL.`,
        );
      }
      throw new Error(`Error retrieving currency data: ${error.message}`);
    }
    throw new Error('An unknown error occurred while retrieving currency data');
  }
};
