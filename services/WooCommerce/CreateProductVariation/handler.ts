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
      'Missing required environment variables: url, consumerKey, and/or consumerSecret',
    );
  }

  // Extract inputs
  const {
    productId,
    regularPrice,
    salePrice,
    sku,
    attributes,
    manageStock,
    stockQuantity,
    stockStatus,
    status,
    virtual,
    downloadable,
    imageId,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!productId) {
    throw new Error('Product ID is required');
  }

  if (!regularPrice) {
    throw new Error('Regular Price is required');
  }

  if (!attributes) {
    throw new Error('Attributes are required');
  }

  // Prepare request body
  const requestBody: Record<string, any> = {
    regular_price: regularPrice,
  };

  // Add optional fields if provided
  if (salePrice) {
    requestBody.sale_price = salePrice;
  }
  if (sku) {
    requestBody.sku = sku;
  }

  // Handle attributes
  // Attributes should be an array of objects with id/name and option properties
  requestBody.attributes = Array.isArray(attributes)
    ? attributes
    : JSON.parse(attributes);

  // Handle stock management
  if (manageStock && manageStock !== 'parent') {
    requestBody.manage_stock = manageStock === 'true';
  } else if (manageStock === 'parent') {
    requestBody.manage_stock = 'parent';
  }

  if (stockQuantity) {
    requestBody.stock_quantity = parseInt(stockQuantity, 10);
  }
  if (stockStatus) {
    requestBody.stock_status = stockStatus;
  }

  // Handle advanced settings
  if (status) {
    requestBody.status = status;
  }
  if (virtual) {
    requestBody.virtual = virtual === 'true';
  }
  if (downloadable) {
    requestBody.downloadable = downloadable === 'true';
  }

  // Handle image
  if (imageId) {
    requestBody.image = { id: parseInt(imageId, 10) };
  }

  // Construct API endpoint
  const apiEndpoint = `${url.replace(/\/$/, '')}/wp-json/wc/v3/products/${productId}/variations`;

  // Prepare authentication
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Creating variation for product ID: ${productId}`);

  try {
    // Make API request
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();

    log(`Successfully created variation with ID: ${data.id}`);

    // Set output variable
    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error creating product variation: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
