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
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      'Missing required WooCommerce credentials. Please check your store URL, consumer key, and consumer secret.',
    );
  }

  // Extract inputs
  const {
    zoneId,
    methodId,
    title,
    enabled,
    cost,
    taxStatus,
    calculationType,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!zoneId) {
    throw new Error('Shipping Zone ID is required');
  }

  if (!methodId) {
    throw new Error('Shipping Method Instance ID is required');
  }

  // Build the request URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/shipping/zones/${zoneId}/methods/${methodId}`;

  log(`Updating shipping method ${methodId} in zone ${zoneId}...`);

  // Prepare the request payload
  const payload: Record<string, any> = {};

  // Add title if provided
  if (title) {
    payload.title = title;
  }

  // Add enabled status if provided
  if (enabled !== undefined) {
    payload.enabled = enabled === 'true';
  }

  // Build settings object if any settings are provided
  const settings: Record<string, any> = {};
  let hasSettings = false;

  if (cost) {
    settings.cost = cost;
    hasSettings = true;
  }

  if (taxStatus) {
    settings.tax_status = taxStatus;
    hasSettings = true;
  }

  if (calculationType) {
    settings.type = calculationType;
    hasSettings = true;
  }

  if (hasSettings) {
    payload.settings = settings;
  }

  try {
    // Encode credentials for Basic Auth
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`,
    ).toString('base64');

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(payload),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    log(
      `Successfully updated shipping method "${data.title || data.method_title}"`,
    );

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    log(
      `Error updating shipping method: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
