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
      'Missing required environment variables: url, consumerKey, and/or consumerSecret',
    );
  }

  // Extract inputs
  const { page, perPage, order, orderby, search, email, role, outputVariable } =
    inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('page', page);
  queryParams.append('per_page', perPage);
  queryParams.append('order', order);
  queryParams.append('orderby', orderby);

  // Add optional filters if provided
  if (search) {
    queryParams.append('search', search);
  }
  if (email) {
    queryParams.append('email', email);
  }
  if (role && role !== 'all') {
    queryParams.append('role', role);
  }

  // Construct the API URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/customers?${queryParams.toString()}`;

  // Create authorization header using Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Fetching customers from your WooCommerce store...`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const customers = await response.json();

    // Log success message with count
    log(`Successfully retrieved ${customers.length} customers`);

    // Set the output variable with the customer data
    setOutput(outputVariable, customers);
  } catch (error) {
    // Handle any errors
    log(`Error fetching customers: ${error.message}`);
    throw error;
  }
};
