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
    throw new Error(
      'Missing store URL. Please configure the WooCommerce connection.',
    );
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce consumer key and secret.',
    );
  }

  // Extract and validate required inputs
  const { attributeId, termId, outputVariable } = inputs;
  if (!attributeId) {
    throw new Error('Attribute ID is required');
  }
  if (!termId) {
    throw new Error('Term ID is required');
  }

  // Build the request URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const requestUrl = `${baseUrl}/wp-json/wc/v3/products/attributes/${attributeId}/terms/${termId}`;

  log(`Updating product attribute term ${termId} for attribute ${attributeId}`);

  // Prepare request body with only provided fields
  const requestBody: Record<string, any> = {};

  if (inputs.name !== undefined) {
    requestBody.name = inputs.name;
  }

  if (inputs.slug !== undefined) {
    requestBody.slug = inputs.slug;
  }

  if (inputs.description !== undefined) {
    requestBody.description = inputs.description;
  }

  if (inputs.menuOrder !== undefined) {
    // Convert to integer if provided as string
    requestBody.menu_order = parseInt(inputs.menuOrder, 10);
  }

  // Prepare authentication credentials for Basic Auth
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  try {
    // Make the API request
    const response = await fetch(requestUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Parse the response
    const responseData = await response.json();

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(
        `WooCommerce API error: ${responseData.message || response.statusText}`,
      );
    }

    log(`Successfully updated term "${responseData.name}"`);

    // Set the output variable with the updated term data
    setOutput(outputVariable, responseData);
  } catch (error) {
    // Handle any errors that occurred during the request
    log(
      `Error updating product attribute term: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
