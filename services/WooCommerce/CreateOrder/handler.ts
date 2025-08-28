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
      'Missing required WooCommerce credentials. Please check your configuration.',
    );
  }

  // Extract inputs
  const {
    paymentMethodId,
    paymentMethodTitle,
    setPaid,
    billingFirstName,
    billingLastName,
    billingEmail,
    billingPhone,
    billingAddress1,
    billingAddress2,
    billingCity,
    billingState,
    billingPostcode,
    billingCountry,
    sameAsBilling,
    shippingFirstName,
    shippingLastName,
    shippingAddress1,
    shippingAddress2,
    shippingCity,
    shippingState,
    shippingPostcode,
    shippingCountry,
    lineItems,
    shippingMethodId,
    shippingMethodTitle,
    shippingCost,
    outputVariable,
  } = inputs;

  // Prepare billing information
  const billing = {
    first_name: billingFirstName,
    last_name: billingLastName,
    email: billingEmail,
    phone: billingPhone || '',
    address_1: billingAddress1,
    address_2: billingAddress2 || '',
    city: billingCity,
    state: billingState,
    postcode: billingPostcode,
    country: billingCountry,
  };

  // Prepare shipping information based on whether it's the same as billing
  let shipping = {};
  if (sameAsBilling === 'true') {
    shipping = {
      first_name: billingFirstName,
      last_name: billingLastName,
      address_1: billingAddress1,
      address_2: billingAddress2 || '',
      city: billingCity,
      state: billingState,
      postcode: billingPostcode,
      country: billingCountry,
    };
  } else {
    shipping = {
      first_name: shippingFirstName || '',
      last_name: shippingLastName || '',
      address_1: shippingAddress1 || '',
      address_2: shippingAddress2 || '',
      city: shippingCity || '',
      state: shippingState || '',
      postcode: shippingPostcode || '',
      country: shippingCountry || '',
    };
  }

  // Prepare shipping lines
  const shipping_lines = [
    {
      method_id: shippingMethodId,
      method_title: shippingMethodTitle,
      total: shippingCost,
    },
  ];

  // Prepare the request payload
  const payload = {
    payment_method: paymentMethodId,
    payment_method_title: paymentMethodTitle,
    set_paid: setPaid === 'true',
    billing,
    shipping,
    line_items: lineItems,
    shipping_lines,
  };

  log('Creating new WooCommerce order...');

  try {
    // Create the authorization header for Basic Auth
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Construct the API endpoint URL
    const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/orders`;

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to create order: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    // Log success message with order details
    log(
      `Order #${data.id} created successfully! Total: ${data.currency_symbol || '$'}${data.total}`,
    );

    // Set the output variable with the order ID
    setOutput(outputVariable, data.id);
  } catch (error) {
    // Handle any errors
    log(
      `Error creating order: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
