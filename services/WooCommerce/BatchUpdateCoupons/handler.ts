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

  // Validate environment variables
  if (!url) {
    throw new Error(
      'Missing store URL. Please configure your WooCommerce store URL.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce API Consumer Key and Secret.',
    );
  }

  // Extract inputs
  const {
    createCoupons = [],
    updateCoupons = [],
    deleteCoupons = [],
    outputVariable,
  } = inputs;

  // Validate that at least one operation is specified
  if (
    (!createCoupons || createCoupons.length === 0) &&
    (!updateCoupons || updateCoupons.length === 0) &&
    (!deleteCoupons || deleteCoupons.length === 0)
  ) {
    throw new Error(
      'At least one operation (create, update, or delete) must be specified.',
    );
  }

  // Prepare request body
  const requestBody: {
    create?: any[];
    update?: any[];
    delete?: number[];
  } = {};

  if (createCoupons && createCoupons.length > 0) {
    requestBody.create = createCoupons;
    log(`Preparing to create ${createCoupons.length} coupon(s)`);
  }

  if (updateCoupons && updateCoupons.length > 0) {
    requestBody.update = updateCoupons;
    log(`Preparing to update ${updateCoupons.length} coupon(s)`);
  }

  if (deleteCoupons && deleteCoupons.length > 0) {
    requestBody.delete = deleteCoupons;
    log(`Preparing to delete ${deleteCoupons.length} coupon(s)`);
  }

  // Prepare API endpoint
  const apiEndpoint = `${url.replace(/\/$/, '')}/wp-json/wc/v3/coupons/batch`;

  // Create Basic Auth credentials
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  try {
    log('Sending batch request to WooCommerce...');

    // Make the API request
    const response = await fetch(apiEndpoint, {
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
      log(`Successfully created ${result.create.length} coupon(s)`);
    }

    if (result.update && result.update.length > 0) {
      log(`Successfully updated ${result.update.length} coupon(s)`);
    }

    if (result.delete && result.delete.length > 0) {
      log(`Successfully deleted ${result.delete.length} coupon(s)`);
    }

    // Set output
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
