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
      'Missing WooCommerce store URL. Please check your configuration.',
    );
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please check your configuration.',
    );
  }

  // Extract inputs
  const {
    orderId,
    amount,
    reason,
    apiRefund,
    apiRestock,
    lineItems,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!orderId) {
    throw new Error('Order ID is required');
  }
  if (!amount) {
    throw new Error('Refund amount is required');
  }

  // Prepare request body
  const requestBody: Record<string, any> = {
    amount: amount,
    api_refund: apiRefund === 'true',
    api_restock: apiRestock === 'true',
  };

  // Add optional fields if provided
  if (reason) {
    requestBody.reason = reason;
  }

  // Add line items if provided
  if (lineItems) {
    requestBody.line_items = lineItems;
  }

  // Construct API endpoint
  const endpoint = `${url.replace(/\/$/, '')}/wp-json/wc/v3/orders/${orderId}/refunds`;

  // Create Basic Auth credentials
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Creating refund for order #${orderId}`);

  try {
    // Make API request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Parse response
    const responseData = await response.json();

    // Handle error responses
    if (!response.ok) {
      const errorMessage = responseData.message || 'Unknown error occurred';
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorMessage}`,
      );
    }

    log(
      `Successfully created refund #${responseData.id} for $${responseData.amount}`,
    );

    // Set output variable
    setOutput(outputVariable, responseData);
  } catch (error) {
    // Handle and rethrow errors
    if (error instanceof Error) {
      log(`Error creating refund: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while creating refund');
  }
};
