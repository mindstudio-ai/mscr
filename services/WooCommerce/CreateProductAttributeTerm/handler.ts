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
  const { attributeId, name, slug, description, menuOrder, outputVariable } =
    inputs;

  // Validate required inputs
  if (!attributeId) {
    throw new Error('Attribute ID is required');
  }

  if (!name) {
    throw new Error('Term Name is required');
  }

  // Prepare the request URL
  // Remove trailing slash from base URL if present
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `/wp-json/wc/v3/products/attributes/${attributeId}/terms`;
  const requestUrl = `${baseUrl}${endpoint}`;

  // Prepare request body
  const requestBody: Record<string, any> = {
    name,
  };

  // Add optional parameters if provided
  if (slug) {
    requestBody.slug = slug;
  }
  if (description) {
    requestBody.description = description;
  }
  if (menuOrder) {
    requestBody.menu_order = parseInt(menuOrder, 10);
  }

  log(
    `Creating new attribute term "${name}" for attribute ID ${attributeId}...`,
  );

  try {
    // Create Basic Auth credentials
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    const data = await response.json();

    log(
      `Successfully created attribute term "${data.name}" with ID ${data.id}`,
    );

    // Set output variable with the created term data
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error creating attribute term: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};
