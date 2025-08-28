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
      "Missing WooCommerce Store URL. Please configure the 'url' environment variable.",
    );
  }
  if (!consumerKey) {
    throw new Error(
      "Missing WooCommerce Consumer Key. Please configure the 'consumerKey' environment variable.",
    );
  }
  if (!consumerSecret) {
    throw new Error(
      "Missing WooCommerce Consumer Secret. Please configure the 'consumerSecret' environment variable.",
    );
  }

  // Extract inputs
  const { orderId, status, customerNote, additionalJson, outputVariable } =
    inputs;

  // Validate required inputs
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  // Prepare the update payload
  const updateData: Record<string, any> = {};

  // Add optional fields if provided
  if (status) {
    updateData.status = status;
  }

  if (customerNote) {
    updateData.customer_note = customerNote;
  }

  // Merge additional JSON if provided
  if (additionalJson) {
    try {
      // If additionalJson is already an object (auto-parsed), use it directly
      // Otherwise, try to parse it as a string
      const additionalFields =
        typeof additionalJson === 'object'
          ? additionalJson
          : JSON.parse(additionalJson);

      Object.assign(updateData, additionalFields);
    } catch (error) {
      throw new Error(
        `Invalid JSON in Additional JSON field: ${error.message}`,
      );
    }
  }

  // Log the operation
  log(`Updating WooCommerce order #${orderId}...`);

  try {
    // Build the API endpoint URL
    const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/orders/${orderId}`;

    // Create the Authorization header using Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(updateData),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const updatedOrder = await response.json();

    // Log success message
    log(
      `Successfully updated order #${orderId} to status: ${updatedOrder.status}`,
    );

    // Set the output variable
    setOutput(outputVariable, updatedOrder);
  } catch (error) {
    // Handle errors
    log(`Error updating order: ${error.message}`);
    throw error;
  }
};
