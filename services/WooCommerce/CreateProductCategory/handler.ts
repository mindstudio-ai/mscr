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
    throw new Error('Missing store URL in environment variables');
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials in environment variables',
    );
  }

  // Extract inputs
  const {
    name,
    slug,
    parent,
    description,
    display,
    imageSrc,
    imageAlt,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!name) {
    throw new Error('Category name is required');
  }

  // Construct the API endpoint URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/products/categories`;

  log(`Creating new product category: "${name}"`);

  // Build the request body
  const requestBody: Record<string, any> = {
    name,
  };

  // Add optional fields if provided
  if (slug) {
    requestBody.slug = slug;
  }
  if (parent) {
    requestBody.parent = parseInt(parent, 10);
  }
  if (description) {
    requestBody.description = description;
  }
  if (display) {
    requestBody.display = display;
  }

  // Add image if provided
  if (imageSrc) {
    requestBody.image = {
      src: imageSrc,
    };

    if (imageAlt) {
      requestBody.image.alt = imageAlt;
    }
  }

  try {
    // Create Basic Auth credentials
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Parse the response
    const responseData = await response.json();

    // Check if the request was successful
    if (!response.ok) {
      const errorMessage = responseData.message || 'Unknown error occurred';
      throw new Error(`WooCommerce API error: ${errorMessage}`);
    }

    log(`Successfully created category "${name}" with ID: ${responseData.id}`);

    // Set the output variable with the created category data
    setOutput(outputVariable, responseData);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error creating product category: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while creating product category');
  }
};
