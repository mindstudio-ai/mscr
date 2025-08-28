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
      'Missing store URL. Please configure your WooCommerce store URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce API Consumer Key and Secret in the connector settings.',
    );
  }

  // Extract inputs
  const { name, slug, description, outputVariable } = inputs;

  // Validate required inputs
  if (!name) {
    throw new Error('Tag name is required');
  }

  // Construct the API endpoint URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const apiUrl = `${baseUrl}/wp-json/wc/v3/products/tags`;

  log(`Creating new product tag: "${name}"`);

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
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Parse the response
    const responseData = await response.json();

    // Handle error responses
    if (!response.ok) {
      const errorMessage = responseData.message || 'Unknown error occurred';
      throw new Error(
        `Failed to create tag: ${errorMessage} (Status: ${response.status})`,
      );
    }

    // Log success and set output
    log(`Successfully created tag "${name}" with ID: ${responseData.id}`);
    setOutput(outputVariable, responseData);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      throw new Error(`Error creating product tag: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while creating product tag');
    }
  }
};
