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

  // Construct the endpoint URL
  const endpoint = `${baseUrl}/wp-json/wc/v3/reports/orders/totals`;

  log('Connecting to WooCommerce API...');

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
    const data = await response.json();

    log(`Successfully retrieved order totals for ${data.length} status types`);

    // Set the output variable
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      // Handle network or API errors
      if (
        error.message.includes('ENOTFOUND') ||
        error.message.includes('ETIMEDOUT')
      ) {
        throw new Error(
          `Could not connect to WooCommerce store at ${url}. Please verify the URL is correct and the store is online.`,
        );
      }

      // Re-throw the error with the original message
      throw error;
    }

    // For unknown errors
    throw new Error(
      'An unexpected error occurred while connecting to WooCommerce',
    );
  }
};
