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

  // Validate required environment variables
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      'Missing required WooCommerce credentials. Please check your configuration.',
    );
  }

  // Extract required inputs
  const { couponId, outputVariable } = inputs;

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

  log(`Connecting to WooCommerce store at ${url}`);

  // Build update payload with only provided fields
  const updateData: Record<string, any> = {};

  // Map inputs to WooCommerce API fields
  const fieldMappings: Record<string, string> = {
    amount: 'amount',
    discountType: 'discount_type',
    description: 'description',
    dateExpires: 'date_expires',
    minimumAmount: 'minimum_amount',
    maximumAmount: 'maximum_amount',
    individualUse: 'individual_use',
    excludeSaleItems: 'exclude_sale_items',
    usageLimit: 'usage_limit',
    usageLimitPerUser: 'usage_limit_per_user',
  };

  // Add only provided fields to the update payload
  for (const [inputKey, apiKey] of Object.entries(fieldMappings)) {
    if (inputs[inputKey] !== undefined && inputs[inputKey] !== '') {
      // Convert string boolean values to actual booleans
      if (inputs[inputKey] === 'true' || inputs[inputKey] === 'false') {
        updateData[apiKey] = inputs[inputKey] === 'true';
      } else {
        updateData[apiKey] = inputs[inputKey];
      }
    }
  }

  // If no update fields were provided, inform the user
  if (Object.keys(updateData).length === 0) {
    log('No coupon properties were provided to update');
    throw new Error('Please provide at least one coupon property to update');
  }

  log(
    `Updating coupon ID: ${couponId} with the following properties: ${Object.keys(updateData).join(', ')}`,
  );

  try {
    // Make the API request to update the coupon
    const response = await api.put(`coupons/${couponId}`, updateData);

    log(`Successfully updated coupon: ${response.data.code || couponId}`);

    // Set the output variable with the updated coupon data
    setOutput(outputVariable, response.data);
  } catch (error: any) {
    // Handle API errors
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Unknown error occurred';
    log(`Failed to update coupon: ${errorMessage}`);
    throw new Error(`WooCommerce API error: ${errorMessage}`);
  }
};
