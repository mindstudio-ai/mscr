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
  if (!url) {
    throw new Error(
      'Store URL is required. Please configure the WooCommerce connection.',
    );
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'WooCommerce API credentials are required. Please configure the consumer key and secret.',
    );
  }

  // Extract inputs
  const {
    attributesToCreate,
    attributesToUpdate,
    attributesToDelete,
    outputVariable,
  } = inputs;

  // Validate that at least one operation is specified
  if (
    !attributesToCreate?.length &&
    !attributesToUpdate?.length &&
    !attributesToDelete?.length
  ) {
    throw new Error(
      'At least one operation (create, update, or delete) must be specified.',
    );
  }

  // Construct the request body
  const requestBody: Record<string, any> = {};

  if (attributesToCreate?.length) {
    requestBody.create = attributesToCreate;
    log(`Preparing to create ${attributesToCreate.length} attribute(s)`);
  }

  if (attributesToUpdate?.length) {
    requestBody.update = attributesToUpdate;
    log(`Preparing to update ${attributesToUpdate.length} attribute(s)`);
  }

  if (attributesToDelete?.length) {
    requestBody.delete = attributesToDelete;
    log(`Preparing to delete ${attributesToDelete.length} attribute(s)`);
  }

  // Construct the API endpoint URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/products/attributes/batch`;

  // Create the authorization header for Basic Auth
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

    // Log operation results
    if (result.create?.length) {
      log(`Successfully created ${result.create.length} attribute(s)`);
    }

    if (result.update?.length) {
      log(`Successfully updated ${result.update.length} attribute(s)`);
    }

    if (result.delete?.length) {
      log(`Successfully deleted ${result.delete.length} attribute(s)`);
    }

    // Set output variable with the API response
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle and rethrow errors with helpful messages
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};
