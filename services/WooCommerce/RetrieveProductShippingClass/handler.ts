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
  const { shippingClassId, outputVariable } = inputs;

  // Get environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate required environment variables
  if (!url) {
    throw new Error('Missing store URL in environment variables');
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error('Missing API credentials in environment variables');
  }

  // Validate required inputs
  if (!shippingClassId) {
    throw new Error('Shipping Class ID is required');
  }

  // Remove trailing slash from URL if present
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint
  const endpoint = `${baseUrl}/wp-json/wc/v3/products/shipping_classes/${shippingClassId}`;

  log(`Retrieving shipping class with ID: ${shippingClassId}`);

  try {
    // Create Basic Auth credentials
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
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
    const shippingClass = await response.json();

    log(`Successfully retrieved shipping class: ${shippingClass.name}`);

    // Set the output variable with the shipping class details
    setOutput(outputVariable, shippingClass);
  } catch (error) {
    // Handle any errors
    if (error instanceof Error) {
      log(`Error retrieving shipping class: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};
