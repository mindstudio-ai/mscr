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
      'Missing WooCommerce store URL. Please configure your WooCommerce connection.',
    );
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please configure your consumer key and secret.',
    );
  }

  // Extract inputs
  const {
    productId,
    variationId,
    regularPrice,
    salePrice,
    status,
    sku,
    manageStock,
    stockQuantity,
    stockStatus,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!productId) {
    throw new Error('Product ID is required');
  }
  if (!variationId) {
    throw new Error('Variation ID is required');
  }
  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  // Construct the API endpoint
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/products/${productId}/variations/${variationId}`;

  // Create authorization header using Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  // Build the request payload with only the provided fields
  const payload: Record<string, any> = {};

  if (regularPrice !== undefined) {
    payload.regular_price = regularPrice;
  }
  if (salePrice !== undefined) {
    payload.sale_price = salePrice;
  }
  if (status !== undefined) {
    payload.status = status;
  }
  if (sku !== undefined) {
    payload.sku = sku;
  }

  // Handle inventory fields
  if (manageStock !== undefined) {
    // Convert string "true"/"false" to boolean
    payload.manage_stock = manageStock === 'true';
  }

  if (stockQuantity !== undefined) {
    // Convert string to number
    payload.stock_quantity = parseInt(stockQuantity, 10);
  }

  if (stockStatus !== undefined) {
    payload.stock_status = stockStatus;
  }

  log(
    `Updating product variation #${variationId} for product #${productId}...`,
  );

  try {
    // Make the API request
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    const data = await response.json();

    log(`Successfully updated product variation "${data.id}"`);

    // Set the output variable with the updated variation data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error updating product variation: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred while updating product variation`);
  }
};
