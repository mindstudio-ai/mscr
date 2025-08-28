export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate required environment variables
  if (!url) {
    throw new Error(
      'Store URL is required. Please configure it in the connector settings.',
    );
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'WooCommerce API credentials (Consumer Key and Consumer Secret) are required.',
    );
  }

  // Extract inputs
  const { shippingClassId, name, slug, description, outputVariable } = inputs;

  // Validate required inputs
  if (!shippingClassId) {
    throw new Error('Shipping Class ID is required.');
  }
  if (!outputVariable) {
    throw new Error('Output Variable is required.');
  }

  // Build request URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const requestUrl = `${baseUrl}/wp-json/wc/v3/products/shipping_classes/${shippingClassId}`;

  // Prepare request body with only provided fields
  const requestBody: Record<string, string> = {};
  if (name !== undefined) {
    requestBody.name = name;
  }
  if (slug !== undefined) {
    requestBody.slug = slug;
  }
  if (description !== undefined) {
    requestBody.description = description;
  }

  // Create authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Updating shipping class with ID: ${shippingClassId}`);

  try {
    // Make the API request
    const response = await fetch(requestUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    const data = await response.json();

    log(`Successfully updated shipping class "${data.name}" (ID: ${data.id})`);

    // Set the output variable with the API response
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle and re-throw any errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error updating shipping class: ${errorMessage}`);
    throw error;
  }
};
