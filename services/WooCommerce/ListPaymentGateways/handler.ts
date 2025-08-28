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
    throw new Error('Missing Store URL in environment variables');
  }

  if (!consumerKey) {
    throw new Error('Missing Consumer Key in environment variables');
  }

  if (!consumerSecret) {
    throw new Error('Missing Consumer Secret in environment variables');
  }

  // Extract input variables
  const { outputVariable } = inputs;

  // Construct the API endpoint URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/payment_gateways`;

  log(`Retrieving payment gateways from your WooCommerce store...`);

  try {
    // Create Basic Auth credentials
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to retrieve payment gateways: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const paymentGateways = await response.json();

    log(`Successfully retrieved ${paymentGateways.length} payment gateways`);

    // Set the output variable with the payment gateways
    setOutput(outputVariable, paymentGateways);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving payment gateways',
    );
  }
};
