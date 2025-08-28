import fetch from 'node-fetch';

export const handler = async ({
  inputs,
  setOutput,
  log,
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
      'Missing required environment variables: url, consumerKey, or consumerSecret',
    );
  }

  // Extract inputs
  const {
    productId,
    createVariations = [],
    updateVariations = [],
    deleteVariations = [],
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!productId) {
    throw new Error('Missing required input: productId');
  }

  // Prepare request body
  const requestBody: Record<string, any> = {};

  // Add create variations if provided
  if (createVariations && createVariations.length > 0) {
    requestBody.create = createVariations;
    log(`Preparing to create ${createVariations.length} variation(s)`);
  }

  // Add update variations if provided
  if (updateVariations && updateVariations.length > 0) {
    requestBody.update = updateVariations;
    log(`Preparing to update ${updateVariations.length} variation(s)`);
  }

  // Add delete variations if provided
  if (deleteVariations && deleteVariations.length > 0) {
    requestBody.delete = deleteVariations;
    log(`Preparing to delete ${deleteVariations.length} variation(s)`);
  }

  // Check if at least one operation is requested
  if (Object.keys(requestBody).length === 0) {
    log(
      'No variations to create, update, or delete. Please provide at least one operation.',
    );
    setOutput(outputVariable, { message: 'No operations requested' });
    return;
  }

  // Construct API endpoint
  const endpoint = `${url.replace(/\/$/, '')}/wp-json/wc/v3/products/${productId}/variations/batch`;

  // Create authorization header (Basic Auth)
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Sending batch request to WooCommerce API...`);

  try {
    // Make the API request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Parse the response
    const responseData = await response.json();

    // Check if the request was successful
    if (!response.ok) {
      const errorMessage = responseData.message || 'Unknown error occurred';
      log(`Error: ${errorMessage}`);
      throw new Error(`WooCommerce API error: ${errorMessage}`);
    }

    // Log success message
    let successMessage = 'Successfully processed batch request:';
    if (responseData.create && responseData.create.length > 0) {
      successMessage += ` Created ${responseData.create.length} variation(s).`;
    }
    if (responseData.update && responseData.update.length > 0) {
      successMessage += ` Updated ${responseData.update.length} variation(s).`;
    }
    if (responseData.delete && responseData.delete.length > 0) {
      successMessage += ` Deleted ${responseData.delete.length} variation(s).`;
    }
    log(successMessage);

    // Set output variable with the response data
    setOutput(outputVariable, responseData);
  } catch (error) {
    // Handle any errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Failed to process batch request: ${errorMessage}`);
    throw error;
  }
};
