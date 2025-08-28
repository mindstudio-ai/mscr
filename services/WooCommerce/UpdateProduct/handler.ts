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

  // Validate required environment variables
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      'Missing required WooCommerce credentials. Please check your configuration.',
    );
  }

  // Extract required inputs
  const { productId, outputVariable } = inputs;

  if (!productId) {
    throw new Error('Product ID is required');
  }

  // Build the API endpoint URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/products/${productId}`;

  // Create authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  // Build request payload with only provided fields
  const payload: Record<string, any> = {};

  // Map inputs to WooCommerce API field names
  if (inputs.name !== undefined) {
    payload.name = inputs.name;
  }
  if (inputs.description !== undefined) {
    payload.description = inputs.description;
  }
  if (inputs.shortDescription !== undefined) {
    payload.short_description = inputs.shortDescription;
  }
  if (inputs.regularPrice !== undefined) {
    payload.regular_price = inputs.regularPrice;
  }
  if (inputs.salePrice !== undefined) {
    payload.sale_price = inputs.salePrice;
  }
  if (inputs.status !== undefined) {
    payload.status = inputs.status;
  }
  if (inputs.catalogVisibility !== undefined) {
    payload.catalog_visibility = inputs.catalogVisibility;
  }
  if (inputs.featured !== undefined) {
    payload.featured = inputs.featured === 'true';
  }

  // If no fields to update were provided
  if (Object.keys(payload).length === 0) {
    log(
      'No product details provided for update. Please specify at least one field to update.',
    );
    throw new Error('No product details provided for update');
  }

  log(`Updating product with ID: ${productId}`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Parse the response
    const data = await response.json();

    // Handle error responses
    if (!response.ok) {
      log(`Error updating product: ${data.message || 'Unknown error'}`);
      throw new Error(
        data.message || `Failed to update product. Status: ${response.status}`,
      );
    }

    log(`Successfully updated product: ${data.name || productId}`);

    // Set the output variable with the updated product data
    setOutput(outputVariable, data);
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
