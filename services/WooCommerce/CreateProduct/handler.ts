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
  if (!url) {
    throw new Error('Missing Store URL in environment variables');
  }
  if (!consumerKey) {
    throw new Error('Missing Consumer Key in environment variables');
  }
  if (!consumerSecret) {
    throw new Error('Missing Consumer Secret in environment variables');
  }

  // Extract and validate required inputs
  const {
    name,
    type,
    regularPrice,
    outputVariable,
    salePrice,
    description,
    shortDescription,
    status,
    featured,
    categories,
    tags,
    imageUrls,
  } = inputs;

  if (!name) {
    throw new Error('Product name is required');
  }

  log(`Creating new ${type} product: "${name}"`);

  // Build the product data object
  const productData: Record<string, any> = {
    name,
    type,
    regular_price: regularPrice.toString(),
    status: status || 'publish',
  };

  // Add optional fields if provided
  if (salePrice) {
    productData.sale_price = salePrice.toString();
  }

  if (description) {
    productData.description = description;
  }

  if (shortDescription) {
    productData.short_description = shortDescription;
  }

  if (featured === 'true') {
    productData.featured = true;
  }

  // Process categories if provided
  if (categories) {
    const categoryIds = categories.split(',').map((id) => id.trim());
    productData.categories = categoryIds.map((id) => ({
      id: parseInt(id, 10),
    }));
  }

  // Process tags if provided
  if (tags) {
    const tagIds = tags.split(',').map((id) => id.trim());
    productData.tags = tagIds.map((id) => ({ id: parseInt(id, 10) }));
  }

  // Process images if provided
  if (imageUrls) {
    const urls = imageUrls.split(',').map((url) => url.trim());
    productData.images = urls.map((src) => ({ src }));
  }

  // Create the API endpoint URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/products`;

  // Create the authorization header (Basic Auth)
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  try {
    log('Sending request to WooCommerce API...');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    const result = await response.json();

    log(`Product created successfully with ID: ${result.id}`);

    // Set the output variable with the created product data
    setOutput(outputVariable, result);
  } catch (error) {
    log(`Error creating product: ${error.message}`);
    throw error;
  }
};
