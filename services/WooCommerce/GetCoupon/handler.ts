import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

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
  if (!url) {
    throw new Error('Missing WooCommerce Store URL in environment variables');
  }
  if (!consumerKey) {
    throw new Error(
      'Missing WooCommerce Consumer Key in environment variables',
    );
  }
  if (!consumerSecret) {
    throw new Error(
      'Missing WooCommerce Consumer Secret in environment variables',
    );
  }

  // Extract inputs
  const { couponId, outputVariable } = inputs;

  // Validate inputs
  if (!couponId) {
    throw new Error('Coupon ID is required');
  }

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url,
    consumerKey,
    consumerSecret,
    version: 'wc/v3',
  });

  try {
    // Log the operation being performed
    log(`Retrieving coupon with ID: ${couponId}`);

    // Make the API request to get the coupon
    const response = await api.get(`coupons/${couponId}`);

    // Log success message
    log(`Successfully retrieved coupon: ${response.data.code}`);

    // Set the output variable with the coupon data
    setOutput(outputVariable, response.data);
  } catch (error: any) {
    // Handle API errors
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message || 'Unknown error';

      if (statusCode === 404) {
        throw new Error(`Coupon with ID ${couponId} not found`);
      } else {
        throw new Error(
          `WooCommerce API error (${statusCode}): ${errorMessage}`,
        );
      }
    } else {
      // Handle network or other errors
      throw new Error(`Error connecting to WooCommerce: ${error.message}`);
    }
  }
};
