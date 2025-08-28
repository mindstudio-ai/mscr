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
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      'Missing required WooCommerce credentials. Please check your store URL, consumer key, and consumer secret.',
    );
  }

  // Extract inputs
  const { createCustomers, updateCustomers, deleteCustomers, outputVariable } =
    inputs;

  // Validate that at least one operation is provided
  if (!createCustomers && !updateCustomers && !deleteCustomers) {
    throw new Error(
      'At least one operation (create, update, or delete) must be provided.',
    );
  }

  // Prepare request payload
  const payload: {
    create?: any[];
    update?: any[];
    delete?: number[];
  } = {};

  // Process create customers if provided
  if (createCustomers) {
    // If createCustomers is already an array, use it directly
    // Otherwise, it might be a string that needs parsing
    payload.create = Array.isArray(createCustomers)
      ? createCustomers
      : typeof createCustomers === 'string'
        ? JSON.parse(createCustomers)
        : createCustomers;

    log(`Preparing to create ${payload.create.length} customer(s)`);
  }

  // Process update customers if provided
  if (updateCustomers) {
    // If updateCustomers is already an array, use it directly
    // Otherwise, it might be a string that needs parsing
    payload.update = Array.isArray(updateCustomers)
      ? updateCustomers
      : typeof updateCustomers === 'string'
        ? JSON.parse(updateCustomers)
        : updateCustomers;

    // Validate that each update item has an ID
    for (const customer of payload.update) {
      if (!customer.id) {
        throw new Error(
          "Each customer in the update list must have an 'id' field.",
        );
      }
    }

    log(`Preparing to update ${payload.update.length} customer(s)`);
  }

  // Process delete customers if provided
  if (deleteCustomers) {
    // If deleteCustomers is a string (comma-separated list), parse it
    if (typeof deleteCustomers === 'string') {
      payload.delete = deleteCustomers
        .split(',')
        .map((id) => id.trim())
        .filter((id) => id) // Remove empty strings
        .map((id) => parseInt(id, 10));
    } else if (Array.isArray(deleteCustomers)) {
      // If it's already an array, convert items to integers
      payload.delete = deleteCustomers.map((id) =>
        typeof id === 'string' ? parseInt(id, 10) : id,
      );
    } else {
      // Single ID
      payload.delete = [parseInt(deleteCustomers, 10)];
    }

    log(`Preparing to delete ${payload.delete.length} customer(s)`);
  }

  // Construct the API endpoint URL
  const apiUrl = `${url}/wp-json/wc/v3/customers/batch`;

  // Create Basic Auth credentials
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  try {
    log('Sending batch request to WooCommerce...');

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
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
    const result = await response.json();

    // Log the results
    if (result.create && result.create.length > 0) {
      log(`Successfully created ${result.create.length} customer(s)`);
    }

    if (result.update && result.update.length > 0) {
      log(`Successfully updated ${result.update.length} customer(s)`);
    }

    if (result.delete && result.delete.length > 0) {
      log(`Successfully deleted ${result.delete.length} customer(s)`);
    }

    // Set the output
    setOutput(outputVariable, result);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while processing the batch request',
    );
  }
};
