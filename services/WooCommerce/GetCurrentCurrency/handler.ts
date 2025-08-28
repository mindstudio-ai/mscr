import axios from 'axios';

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

  // Extract the output variable name from inputs
  const { outputVariable } = inputs;

  // Normalize the base URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the full API endpoint
  const endpoint = `${baseUrl}/wp-json/wc/v3/data/currencies/current`;

  log('Retrieving current currency information from your WooCommerce store...');

  try {
    // Make the API request with basic authentication
    const response = await axios.get(endpoint, {
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
    });

    // Extract the currency data from the response
    const currencyInfo = response.data;

    log(
      `Successfully retrieved currency information: ${currencyInfo.code} (${currencyInfo.symbol})`,
    );

    // Set the output variable with the currency information
    setOutput(outputVariable, currencyInfo);
  } catch (error) {
    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const statusCode = error.response.status;

        if (statusCode === 401 || statusCode === 403) {
          throw new Error(
            'Authentication failed. Please check your WooCommerce API credentials.',
          );
        } else {
          throw new Error(
            `WooCommerce API error (${statusCode}): ${JSON.stringify(error.response.data)}`,
          );
        }
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error(
          `Connection error: Could not connect to your WooCommerce store. Please verify the store URL and that the store is accessible.`,
        );
      }
    }

    // Generic error handling
    throw error;
  }
};
