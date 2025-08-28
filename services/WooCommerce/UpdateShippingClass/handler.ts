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
    throw new Error('Missing store URL in environment variables');
  }
  if (!consumerKey) {
    throw new Error('Missing consumer key in environment variables');
  }
  if (!consumerSecret) {
    throw new Error('Missing consumer secret in environment variables');
  }

  // Extract inputs
  const { shippingClassId, name, slug, description, outputVariable } = inputs;

  // Validate required inputs
  if (!shippingClassId) {
    throw new Error('Shipping Class ID is required');
  }

  // Construct the API endpoint URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/products/shipping_classes/${shippingClassId}`;

  // Create the request body with only the provided fields
  const requestBody: Record<string, string> = {};
  if (name !== undefined) {
    requestBody.name = name;
  }
  if (slug !== undefined) {
    requestBody.slug = slug;
  }
  if (description !== undefined) {
    requestBody.description = description;
  }

  // Log the update operation
  log(`Updating shipping class with ID: ${shippingClassId}`);

  try {
    // Create the authentication credentials for Basic Auth
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`,
    ).toString('base64');

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Parse the response
    const data = await response.json();

    // Handle error responses
    if (!response.ok) {
      const errorMessage = data.message || 'Unknown error occurred';
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorMessage}`,
      );
    }

    // Log success
    log(`Successfully updated shipping class: ${data.name || shippingClassId}`);

    // Set the output variable with the updated shipping class data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle and rethrow errors
    if (error instanceof Error) {
      log(`Error updating shipping class: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error: ${String(error)}`);
  }
};
