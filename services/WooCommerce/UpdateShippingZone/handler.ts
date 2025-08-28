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
      'Missing WooCommerce Store URL. Please check your connection settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please check your connection settings.',
    );
  }

  // Extract inputs
  const { zoneId, order, outputVariable } = inputs;

  if (!zoneId) {
    throw new Error('Shipping Zone ID is required.');
  }

  // Prepare request data
  const requestData = {
    order: parseInt(order, 10),
  };

  // Construct API endpoint
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/shipping/zones/${zoneId}`;

  log(`Updating shipping zone ${zoneId} with new sort order: ${order}`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' +
          Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64'),
      },
      body: JSON.stringify(requestData),
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    const result = await response.json();

    log(
      `Successfully updated shipping zone "${result.name}" (ID: ${result.id})`,
    );

    // Set the output
    setOutput(outputVariable, result);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update shipping zone: ${error.message}`);
    }
    throw new Error(
      'An unknown error occurred while updating the shipping zone',
    );
  }
};
