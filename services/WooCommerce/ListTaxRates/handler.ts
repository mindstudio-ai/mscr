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
  if (!url) {
    throw new Error(
      'Store URL is required. Please configure it in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'WooCommerce API credentials (Consumer Key and Consumer Secret) are required.',
    );
  }

  // Extract input parameters
  const {
    page,
    perPage,
    order,
    orderby,
    class: taxClass,
    outputVariable,
  } = inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (page) {
    queryParams.append('page', page);
  }
  if (perPage) {
    queryParams.append('per_page', perPage);
  }
  if (order) {
    queryParams.append('order', order);
  }
  if (orderby) {
    queryParams.append('orderby', orderby);
  }
  if (taxClass) {
    queryParams.append('class', taxClass);
  }

  // Construct the API endpoint URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/taxes?${queryParams.toString()}`;

  // Create the authorization header (Basic Auth)
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log('Fetching tax rates from WooCommerce...');

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
    const taxRates = await response.json();

    if (!Array.isArray(taxRates)) {
      throw new Error(
        'Unexpected response format. Expected an array of tax rates.',
      );
    }

    log(`Successfully retrieved ${taxRates.length} tax rates.`);

    // Set the output variable with the tax rates
    setOutput(outputVariable, taxRates);
  } catch (error) {
    log(
      `Error fetching tax rates: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
