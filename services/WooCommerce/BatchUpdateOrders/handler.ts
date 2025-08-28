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
    throw new Error('Missing Store URL in environment variables');
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error('Missing API credentials in environment variables');
  }

  // Extract inputs
  const { ordersToCreate, ordersToUpdate, ordersToDelete, outputVariable } =
    inputs;

  // Validate that at least one operation is provided
  if (!ordersToCreate && !ordersToUpdate && !ordersToDelete) {
    throw new Error(
      'At least one operation (create, update, or delete) must be provided',
    );
  }

  // Prepare request body
  const requestBody: Record<string, any> = {};

  // Add create operations if provided
  if (
    ordersToCreate &&
    Array.isArray(ordersToCreate) &&
    ordersToCreate.length > 0
  ) {
    requestBody.create = ordersToCreate;
    log(`Preparing to create ${ordersToCreate.length} orders`);
  }

  // Add update operations if provided
  if (
    ordersToUpdate &&
    Array.isArray(ordersToUpdate) &&
    ordersToUpdate.length > 0
  ) {
    // Validate that each update operation includes an ID
    const missingIds = ordersToUpdate.filter((order) => !order.id);
    if (missingIds.length > 0) {
      throw new Error(
        `All orders to update must include an 'id' field. Found ${missingIds.length} orders without IDs.`,
      );
    }

    requestBody.update = ordersToUpdate;
    log(`Preparing to update ${ordersToUpdate.length} orders`);
  }

  // Add delete operations if provided
  if (
    ordersToDelete &&
    Array.isArray(ordersToDelete) &&
    ordersToDelete.length > 0
  ) {
    requestBody.delete = ordersToDelete;
    log(`Preparing to delete ${ordersToDelete.length} orders`);
  }

  // Construct API endpoint URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/orders/batch`;

  // Create Authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  try {
    log('Sending batch request to WooCommerce API...');

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Parse the response
    const responseData = await response.json();

    // Check if the request was successful
    if (!response.ok) {
      const errorMessage = responseData.message || 'Unknown error occurred';
      throw new Error(`WooCommerce API error: ${errorMessage}`);
    }

    // Log results summary
    if (responseData.create && responseData.create.length > 0) {
      log(`Successfully created ${responseData.create.length} orders`);
    }
    if (responseData.update && responseData.update.length > 0) {
      log(`Successfully updated ${responseData.update.length} orders`);
    }
    if (responseData.delete && responseData.delete.length > 0) {
      log(`Successfully deleted ${responseData.delete.length} orders`);
    }

    // Set the output variable with the complete response
    setOutput(outputVariable, responseData);
  } catch (error) {
    // Handle any errors that occurred during the API request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};
