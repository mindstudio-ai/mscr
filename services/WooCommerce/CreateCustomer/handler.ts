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
    throw new Error('Missing store URL in environment variables');
  }
  if (!consumerKey) {
    throw new Error(
      'Missing WooCommerce API Consumer Key in environment variables',
    );
  }
  if (!consumerSecret) {
    throw new Error(
      'Missing WooCommerce API Consumer Secret in environment variables',
    );
  }

  // Extract required inputs
  const { email, outputVariable } = inputs;
  if (!email) {
    throw new Error('Email is required');
  }

  // Prepare the API endpoint URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/customers`;

  log(`Creating a new customer with email: ${email}`);

  // Prepare the request body
  const customerData: Record<string, any> = {
    email: email,
  };

  // Add optional customer information if provided
  if (inputs.firstName) {
    customerData.first_name = inputs.firstName;
  }
  if (inputs.lastName) {
    customerData.last_name = inputs.lastName;
  }
  if (inputs.username) {
    customerData.username = inputs.username;
  }
  if (inputs.password) {
    customerData.password = inputs.password;
  }

  // Prepare billing information if any is provided
  const billingFields = [
    'billingFirstName',
    'billingLastName',
    'billingCompany',
    'billingAddress1',
    'billingAddress2',
    'billingCity',
    'billingState',
    'billingPostcode',
    'billingCountry',
    'billingEmail',
    'billingPhone',
  ];

  if (billingFields.some((field) => inputs[field])) {
    customerData.billing = {};

    if (inputs.billingFirstName) {
      customerData.billing.first_name = inputs.billingFirstName;
    }
    if (inputs.billingLastName) {
      customerData.billing.last_name = inputs.billingLastName;
    }
    if (inputs.billingCompany) {
      customerData.billing.company = inputs.billingCompany;
    }
    if (inputs.billingAddress1) {
      customerData.billing.address_1 = inputs.billingAddress1;
    }
    if (inputs.billingAddress2) {
      customerData.billing.address_2 = inputs.billingAddress2;
    }
    if (inputs.billingCity) {
      customerData.billing.city = inputs.billingCity;
    }
    if (inputs.billingState) {
      customerData.billing.state = inputs.billingState;
    }
    if (inputs.billingPostcode) {
      customerData.billing.postcode = inputs.billingPostcode;
    }
    if (inputs.billingCountry) {
      customerData.billing.country = inputs.billingCountry;
    }
    if (inputs.billingEmail) {
      customerData.billing.email = inputs.billingEmail;
    }
    if (inputs.billingPhone) {
      customerData.billing.phone = inputs.billingPhone;
    }
  }

  // Prepare shipping information if any is provided
  const shippingFields = [
    'shippingFirstName',
    'shippingLastName',
    'shippingCompany',
    'shippingAddress1',
    'shippingAddress2',
    'shippingCity',
    'shippingState',
    'shippingPostcode',
    'shippingCountry',
  ];

  if (shippingFields.some((field) => inputs[field])) {
    customerData.shipping = {};

    if (inputs.shippingFirstName) {
      customerData.shipping.first_name = inputs.shippingFirstName;
    }
    if (inputs.shippingLastName) {
      customerData.shipping.last_name = inputs.shippingLastName;
    }
    if (inputs.shippingCompany) {
      customerData.shipping.company = inputs.shippingCompany;
    }
    if (inputs.shippingAddress1) {
      customerData.shipping.address_1 = inputs.shippingAddress1;
    }
    if (inputs.shippingAddress2) {
      customerData.shipping.address_2 = inputs.shippingAddress2;
    }
    if (inputs.shippingCity) {
      customerData.shipping.city = inputs.shippingCity;
    }
    if (inputs.shippingState) {
      customerData.shipping.state = inputs.shippingState;
    }
    if (inputs.shippingPostcode) {
      customerData.shipping.postcode = inputs.shippingPostcode;
    }
    if (inputs.shippingCountry) {
      customerData.shipping.country = inputs.shippingCountry;
    }
  }

  try {
    // Create the authorization header for Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(customerData),
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

    log(`Customer created successfully with ID: ${result.id}`);

    // Set the output variable with the customer data
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle any errors that occurred during the API request
    log(
      `Error creating customer: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
