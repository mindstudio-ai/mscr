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
    throw new Error('Store URL is required');
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'WooCommerce API credentials (Consumer Key and Consumer Secret) are required',
    );
  }

  // Extract inputs
  const {
    createTags = [],
    updateTags = [],
    deleteTags = [],
    outputVariable,
  } = inputs;

  // Validate that at least one operation is provided
  if (
    createTags.length === 0 &&
    updateTags.length === 0 &&
    deleteTags.length === 0
  ) {
    throw new Error(
      'At least one operation (create, update, or delete) must be provided',
    );
  }

  // Validate total operations don't exceed 100
  const totalOperations =
    createTags.length + updateTags.length + deleteTags.length;
  if (totalOperations > 100) {
    throw new Error('Total operations cannot exceed 100 items');
  }

  // Prepare request payload
  const payload: {
    create?: any[];
    update?: any[];
    delete?: number[];
  } = {};

  if (createTags.length > 0) {
    payload.create = createTags;
    log(`Preparing to create ${createTags.length} product tag(s)`);
  }

  if (updateTags.length > 0) {
    // Validate that all update tags have IDs
    const missingIds = updateTags.filter((tag) => !tag.id);
    if (missingIds.length > 0) {
      throw new Error('All tags to update must include an ID');
    }

    payload.update = updateTags;
    log(`Preparing to update ${updateTags.length} product tag(s)`);
  }

  if (deleteTags.length > 0) {
    payload.delete = deleteTags;
    log(`Preparing to delete ${deleteTags.length} product tag(s)`);
  }

  // Prepare the API endpoint URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/products/tags/batch`;

  // Create Basic Auth credentials
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  try {
    log('Sending batch request to WooCommerce...');

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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
      log(`Successfully created ${result.create.length} product tag(s)`);
    }

    if (result.update && result.update.length > 0) {
      log(`Successfully updated ${result.update.length} product tag(s)`);
    }

    if (result.delete && result.delete.length > 0) {
      log(`Successfully deleted ${result.delete.length} product tag(s)`);
    }

    // Set output variable with the complete result
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      throw new Error(`Failed to perform batch operation: ${error.message}`);
    } else {
      throw new Error('Failed to perform batch operation: Unknown error');
    }
  }
};
