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
      'Missing required environment variables: url, consumerKey, or consumerSecret',
    );
  }

  // Extract inputs
  const { couponId, force, outputVariable } = inputs;

  // Validate inputs
  if (!couponId) {
    throw new Error('Coupon ID is required');
  }

  // Prepare API endpoint
  const apiUrl = `${url}/wp-json/wc/v3/coupons/${couponId}`;
  const queryParams = new URLSearchParams();

  // Add force parameter if set to true
  if (force === 'true') {
    queryParams.append('force', 'true');
    log(`Preparing to permanently delete coupon with ID: ${couponId}`);
  } else {
    log(
      `Preparing to delete coupon with ID: ${couponId} (can be restored from trash)`,
    );
  }

  // Prepare the final URL with query parameters
  const finalUrl = `${apiUrl}?${queryParams.toString()}`;

  // Create authorization header using Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  try {
    // Make the DELETE request to WooCommerce API
    log('Sending delete request to WooCommerce...');
    const response = await fetch(finalUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `Failed to delete coupon: ${response.status} ${response.statusText}${
          errorData ? ` - ${JSON.stringify(errorData)}` : ''
        }`,
      );
    }

    // Parse the response
    const deletedCoupon = await response.json();

    // Log success message
    log(`Successfully deleted coupon: ${deletedCoupon.code || couponId}`);

    // Set the output variable with the deleted coupon data
    setOutput(outputVariable, deletedCoupon);
  } catch (error) {
    // Handle any errors
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
