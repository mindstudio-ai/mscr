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

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url,
    consumerKey,
    consumerSecret,
    version: 'wc/v3',
  });

  // Extract inputs
  const {
    code,
    discountType,
    amount,
    description,
    individualUse,
    excludeSaleItems,
    minimumAmount,
    maximumAmount,
    emailRestrictions,
    usageLimit,
    usageLimitPerUser,
    dateExpires,
    freeShipping,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!code) {
    throw new Error('Coupon code is required');
  }

  log(`Creating coupon with code: ${code}`);

  // Prepare coupon data
  const couponData: Record<string, any> = {
    code,
    discount_type: discountType,
    amount: amount,
  };

  // Add optional fields if provided
  if (description) {
    couponData.description = description;
  }

  // Convert string boolean values to actual booleans
  if (individualUse) {
    couponData.individual_use = individualUse === 'true';
  }
  if (excludeSaleItems) {
    couponData.exclude_sale_items = excludeSaleItems === 'true';
  }
  if (freeShipping) {
    couponData.free_shipping = freeShipping === 'true';
  }

  // Add amount restrictions if provided
  if (minimumAmount) {
    couponData.minimum_amount = minimumAmount;
  }
  if (maximumAmount) {
    couponData.maximum_amount = maximumAmount;
  }

  // Add usage limits if provided
  if (usageLimit) {
    couponData.usage_limit = parseInt(usageLimit, 10);
  }
  if (usageLimitPerUser) {
    couponData.usage_limit_per_user = parseInt(usageLimitPerUser, 10);
  }

  // Add expiry date if provided
  if (dateExpires) {
    couponData.date_expires = dateExpires;
  }

  // Add email restrictions if provided
  if (emailRestrictions) {
    const emails = emailRestrictions
      .split(',')
      .map((email: string) => email.trim());
    if (emails.length > 0) {
      couponData.email_restrictions = emails;
    }
  }

  try {
    // Make API request to create the coupon
    log('Sending request to WooCommerce API...');
    const response = await api.post('coupons', couponData);

    // Log success and set output
    log(`Coupon "${code}" created successfully with ID: ${response.data.id}`);
    setOutput(outputVariable, response.data);
  } catch (error: any) {
    // Handle API errors
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Unknown error occurred';
    log(`Error creating coupon: ${errorMessage}`);
    throw new Error(`Failed to create coupon: ${errorMessage}`);
  }
};
