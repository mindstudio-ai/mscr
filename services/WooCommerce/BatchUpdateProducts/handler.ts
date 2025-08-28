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
  if (!consumerKey || !consumerSecret) {
    throw new Error('Missing API credentials in environment variables');
  }

  // Extract inputs
  const { createProducts, updateProducts, deleteProducts, outputVariable } =
    inputs;

  // Validate that at least one operation is provided
  if (!createProducts && !updateProducts && !deleteProducts) {
    throw new Error(
      'At least one operation (create, update, or delete) must be provided',
    );
  }

  // Prepare request body
  const requestBody: Record<string, any> = {};

  if (createProducts) {
    requestBody.create = createProducts;
    log(`Preparing to create ${createProducts.length} product(s)`);
  }

  if (updateProducts) {
    requestBody.update = updateProducts;
    log(`Preparing to update ${updateProducts.length} product(s)`);
  }

  if (deleteProducts) {
    requestBody.delete = deleteProducts;
    log(`Preparing to delete ${deleteProducts.length} product(s)`);
  }

  // Construct API endpoint
  const endpoint = `${url.replace(/\/$/, '')}/wp-json/wc/v3/products/batch`;

  // Create authorization header (Basic Auth)
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  try {
    log('Sending batch request to WooCommerce...');

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    const result = await response.json();

    // Log operation results
    if (result.create && result.create.length > 0) {
      log(`Successfully created ${result.create.length} product(s)`);
    }

    if (result.update && result.update.length > 0) {
      log(`Successfully updated ${result.update.length} product(s)`);
    }

    if (result.delete && result.delete.length > 0) {
      log(`Successfully deleted ${result.delete.length} product(s)`);
    }

    // Set output variable with the full response
    setOutput(outputVariable, result);
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
