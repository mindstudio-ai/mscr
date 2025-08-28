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
    throw new Error('Missing Store URL in environment variables');
  }
  if (!consumerKey) {
    throw new Error('Missing Consumer Key in environment variables');
  }
  if (!consumerSecret) {
    throw new Error('Missing Consumer Secret in environment variables');
  }

  // Extract inputs
  const { createOrders, updateOrders, deleteOrders, outputVariable } = inputs;

  // Validate that at least one operation is provided
  if (!createOrders && !updateOrders && !deleteOrders) {
    throw new Error(
      'At least one operation (create, update, or delete) must be provided',
    );
  }

  // Prepare request body
  const requestBody: Record<string, any> = {};

  // Add create orders if provided
  if (createOrders && Array.isArray(createOrders) && createOrders.length > 0) {
    requestBody.create = createOrders;
    log(`Preparing to create ${createOrders.length} orders`);
  }

  // Add update orders if provided
  if (updateOrders && Array.isArray(updateOrders) && updateOrders.length > 0) {
    requestBody.update = updateOrders;
    log(`Preparing to update ${updateOrders.length} orders`);
  }

  // Process delete orders if provided
  if (deleteOrders) {
    // Handle different formats of deleteOrders (string or array)
    let orderIdsToDelete: number[] = [];

    if (typeof deleteOrders === 'string') {
      // Parse comma-separated string of IDs
      orderIdsToDelete = deleteOrders
        .split(',')
        .map((id) => parseInt(id.trim(), 10))
        .filter((id) => !isNaN(id));
    } else if (Array.isArray(deleteOrders)) {
      // Handle array of IDs
      orderIdsToDelete = deleteOrders
        .map((id) => (typeof id === 'string' ? parseInt(id.trim(), 10) : id))
        .filter((id) => !isNaN(id));
    }

    if (orderIdsToDelete.length > 0) {
      requestBody.delete = orderIdsToDelete;
      log(`Preparing to delete ${orderIdsToDelete.length} orders`);
    }
  }

  // Construct the API endpoint URL
  const apiUrl = new URL('/wp-json/wc/v3/orders/batch', url).toString();

  // Create auth credentials for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log('Sending batch request to WooCommerce API...');

  try {
    // Make the API request
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

    const result = await response.json();

    // Log operation summary
    const createCount = result.create?.length || 0;
    const updateCount = result.update?.length || 0;
    const deleteCount = result.delete?.length || 0;

    log(
      `Batch operation completed successfully: ${createCount} orders created, ${updateCount} orders updated, ${deleteCount} orders deleted`,
    );

    // Set the output variable with the complete response
    setOutput(outputVariable, result);
  } catch (error) {
    log(`Error performing batch operation: ${error.message}`);
    throw error;
  }
};
