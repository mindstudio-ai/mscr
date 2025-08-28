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
  // Extract inputs
  const { gatewayId, enabled, settings, outputVariable } = inputs;

  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate required inputs and environment variables
  if (!gatewayId) {
    throw new Error('Gateway ID is required');
  }

  if (!url) {
    throw new Error('Store URL is not configured');
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error('WooCommerce API credentials are not configured');
  }

  // Prepare the request URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/payment_gateways/${gatewayId}`;

  // Prepare the request body
  const requestBody: Record<string, any> = {};

  // Add enabled status if provided
  if (enabled !== undefined && enabled !== '') {
    requestBody.enabled = enabled === 'true';
  }

  // Add settings if provided
  if (settings && Object.keys(settings).length > 0) {
    requestBody.settings = settings;
  }

  // Check if we have anything to update
  if (Object.keys(requestBody).length === 0) {
    throw new Error(
      'No update parameters provided. Please specify gateway status or settings to update.',
    );
  }

  log(`Updating payment gateway '${gatewayId}'...`);

  try {
    // Create Basic Auth credentials
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
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

    // Log success message
    log(`Successfully updated payment gateway '${data.id}'`);

    if (data.enabled !== undefined) {
      log(`Gateway status: ${data.enabled ? 'Enabled' : 'Disabled'}`);
    }

    // Set output variable
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};
