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
  const {
    attributeId,
    name,
    slug,
    type,
    orderBy,
    hasArchives,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!attributeId) {
    throw new Error('Attribute ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  // Prepare request URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const requestUrl = `${baseUrl}/wp-json/wc/v3/products/attributes/${attributeId}`;

  // Prepare request body - only include fields that are provided
  const requestBody: Record<string, any> = {};

  if (name !== undefined) {
    requestBody.name = name;
  }
  if (slug !== undefined) {
    requestBody.slug = slug;
  }
  if (type !== undefined) {
    requestBody.type = type;
  }
  if (orderBy !== undefined) {
    requestBody.order_by = orderBy;
  }
  if (hasArchives !== undefined) {
    requestBody.has_archives = hasArchives === 'true';
  }

  log(`Updating product attribute with ID: ${attributeId}`);

  try {
    // Make the API request
    const response = await fetch(requestUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' +
          Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64'),
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update product attribute: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const updatedAttribute = await response.json();

    log(`Successfully updated product attribute: ${updatedAttribute.name}`);

    // Set the output variable
    setOutput(outputVariable, updatedAttribute);
  } catch (error) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error: ${errorMessage}`);
    throw error;
  }
};
