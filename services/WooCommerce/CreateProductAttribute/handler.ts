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
      'Missing WooCommerce store URL. Please check your connector configuration.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please check your connector configuration.',
    );
  }

  // Extract inputs
  const { name, slug, orderBy, hasArchives, outputVariable } = inputs;

  // Validate required inputs
  if (!name) {
    throw new Error('Attribute name is required');
  }

  // Prepare request payload
  const payload: Record<string, any> = {
    name,
  };

  // Add optional parameters if provided
  if (slug) {
    payload.slug = slug;
  }

  if (orderBy) {
    payload.order_by = orderBy;
  }

  // Convert string boolean to actual boolean
  if (hasArchives !== undefined) {
    payload.has_archives = hasArchives === 'true';
  }

  // Set default type to select (the only supported type in WooCommerce)
  payload.type = 'select';

  // Construct the API endpoint
  const apiEndpoint = `${url.replace(/\/$/, '')}/wp-json/wc/v3/products/attributes`;

  // Create the Basic Auth credentials
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Creating product attribute: ${name}`);

  try {
    // Make the API request
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
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

    const attributeData = await response.json();

    log(
      `Successfully created attribute "${attributeData.name}" with ID: ${attributeData.id}`,
    );

    // Set the output variable with the created attribute data
    setOutput(outputVariable, attributeData);
  } catch (error) {
    // Handle errors
    log(
      `Error creating product attribute: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
