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
    throw new Error('Missing store URL in environment variables');
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error('Missing API credentials in environment variables');
  }

  // Extract inputs
  const { createClasses, updateClasses, deleteClassIds, outputVariable } =
    inputs;

  // Prepare the request body
  const requestBody: Record<string, any> = {};

  // Add create operations if provided
  if (
    createClasses &&
    Array.isArray(createClasses) &&
    createClasses.length > 0
  ) {
    requestBody.create = createClasses;
    log(`Preparing to create ${createClasses.length} shipping class(es)`);
  }

  // Add update operations if provided
  if (
    updateClasses &&
    Array.isArray(updateClasses) &&
    updateClasses.length > 0
  ) {
    requestBody.update = updateClasses;
    log(`Preparing to update ${updateClasses.length} shipping class(es)`);
  }

  // Add delete operations if provided
  if (deleteClassIds) {
    // Convert comma-separated string to array of integers
    const deleteIds = deleteClassIds
      .split(',')
      .map((id: string) => parseInt(id.trim(), 10))
      .filter((id: number) => !isNaN(id));

    if (deleteIds.length > 0) {
      requestBody.delete = deleteIds;
      log(`Preparing to delete ${deleteIds.length} shipping class(es)`);
    }
  }

  // Check if there are any operations to perform
  if (Object.keys(requestBody).length === 0) {
    throw new Error(
      'No operations specified. Please provide at least one create, update, or delete operation.',
    );
  }

  // Construct the API endpoint URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/products/shipping_classes/batch`;

  // Create the authorization header using Basic Auth
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
    const createdCount = result.create?.length || 0;
    const updatedCount = result.update?.length || 0;
    const deletedCount = result.delete?.length || 0;

    log(
      `Operation completed successfully: ${createdCount} created, ${updatedCount} updated, ${deletedCount} deleted`,
    );

    // Set the output variable with the full result
    setOutput(outputVariable, result);
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
