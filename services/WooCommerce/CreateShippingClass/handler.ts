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
    throw new Error('Missing WooCommerce store URL in environment variables');
  }
  if (!consumerKey) {
    throw new Error(
      'Missing WooCommerce Consumer Key in environment variables',
    );
  }
  if (!consumerSecret) {
    throw new Error(
      'Missing WooCommerce Consumer Secret in environment variables',
    );
  }

  // Extract inputs
  const { name, slug, description, outputVariable } = inputs;

  // Validate required inputs
  if (!name) {
    throw new Error('Shipping class name is required');
  }

  // Construct the API endpoint URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/products/shipping_classes`;

  log(`Creating shipping class "${name}" in WooCommerce...`);

  // Prepare request body
  const requestBody: Record<string, string> = {
    name,
  };

  // Add optional fields if provided
  if (slug) {
    requestBody.slug = slug;
  }

  if (description) {
    requestBody.description = description;
  }

  try {
    // Create the authorization header for Basic Auth
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
    const data = await response.json();

    // Handle error responses
    if (!response.ok) {
      const errorMessage = data.message || 'Unknown error occurred';
      throw new Error(`WooCommerce API Error: ${errorMessage}`);
    }

    log(`Successfully created shipping class "${name}" with ID: ${data.id}`);

    // Set the output variable with the created shipping class data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    log(
      `Error creating shipping class: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
