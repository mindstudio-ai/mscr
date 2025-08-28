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

  // Validate environment variables
  if (!url) {
    throw new Error(
      'Store URL is required. Please check your connection settings.',
    );
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'WooCommerce API credentials (Consumer Key and Consumer Secret) are required.',
    );
  }

  // Extract and validate inputs
  const { name, slug, description, outputVariable } = inputs;

  if (!name) {
    throw new Error('Shipping class name is required.');
  }

  // Construct API endpoint URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/products/shipping_classes`;

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

  log(`Creating shipping class "${name}" in WooCommerce...`);

  try {
    // Create Basic Auth credentials
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make API request
    const response = await fetch(apiUrl, {
      method: 'POST',
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

    const shippingClass = await response.json();

    log(
      `Successfully created shipping class "${name}" with ID: ${shippingClass.id}`,
    );

    // Set output variable with the created shipping class details
    setOutput(outputVariable, shippingClass);
  } catch (error) {
    log(
      `Error creating shipping class: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
