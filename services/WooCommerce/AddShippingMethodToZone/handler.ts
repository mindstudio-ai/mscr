export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract inputs
  const { zoneId, methodId, outputVariable } = inputs;

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

  // Validate required inputs
  if (!zoneId) {
    throw new Error('Zone ID is required');
  }
  if (!methodId) {
    throw new Error('Shipping Method ID is required');
  }

  // Normalize the base URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint
  const endpoint = `${baseUrl}/wp-json/wc/v3/shipping/zones/${zoneId}/methods`;

  // Prepare the request body
  const requestBody = JSON.stringify({
    method_id: methodId,
  });

  log(
    `Adding ${getMethodName(methodId)} shipping method to zone ID: ${zoneId}`,
  );

  try {
    // Create Basic Auth credentials
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`,
    ).toString('base64');

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: requestBody,
    });

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    const data = await response.json();

    log(`Successfully added ${data.method_title} shipping method to zone`);

    // Set the output variable with the API response
    setOutput(outputVariable, data);
  } catch (error) {
    log(`Error adding shipping method: ${error.message}`);
    throw error;
  }
};

// Helper function to get a human-readable method name
function getMethodName(methodId: string): string {
  const methodNames: Record<string, string> = {
    flat_rate: 'Flat Rate',
    free_shipping: 'Free Shipping',
    local_pickup: 'Local Pickup',
  };

  return methodNames[methodId] || methodId;
}
