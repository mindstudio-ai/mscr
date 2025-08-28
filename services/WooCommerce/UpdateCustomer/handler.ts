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

  // Validate required environment variables
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      'Missing required environment variables. Please configure your WooCommerce connection.',
    );
  }

  // Extract required inputs
  const { customerId, outputVariable } = inputs;

  if (!customerId) {
    throw new Error('Customer ID is required');
  }

  log(`Preparing to update customer with ID: ${customerId}`);

  // Build the customer update object
  const customerData: Record<string, any> = {};

  // Add basic customer fields if provided
  if (inputs.firstName) {
    customerData.first_name = inputs.firstName;
  }
  if (inputs.lastName) {
    customerData.last_name = inputs.lastName;
  }
  if (inputs.email) {
    customerData.email = inputs.email;
  }

  // Check if any billing information was provided
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
    'billingPhone',
    'billingEmail',
  ];

  const hasBillingInfo = billingFields.some(
    (field) => inputs[field] !== undefined,
  );

  if (hasBillingInfo) {
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
    if (inputs.billingPhone) {
      customerData.billing.phone = inputs.billingPhone;
    }
    if (inputs.billingEmail) {
      customerData.billing.email = inputs.billingEmail;
    }
  }

  // Check if any shipping information was provided
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

  const hasShippingInfo = shippingFields.some(
    (field) => inputs[field] !== undefined,
  );

  if (hasShippingInfo) {
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

  // Ensure we have at least one field to update
  if (Object.keys(customerData).length === 0) {
    throw new Error(
      'At least one field must be provided to update the customer',
    );
  }

  // Create the authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  // Construct the API URL
  const apiUrl = `${url}/wp-json/wc/v3/customers/${customerId}`;

  log('Sending update request to WooCommerce...');

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
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
    const updatedCustomer = await response.json();

    log(`Customer ${customerId} successfully updated`);

    // Set the output variable
    setOutput(outputVariable, updatedCustomer);
  } catch (error) {
    log(
      `Error updating customer: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
