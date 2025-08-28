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
      'Missing Store URL. Please configure your WooCommerce store URL in the connection settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce API Consumer Key and Secret in the connection settings.',
    );
  }

  // Extract input parameters
  const { dateRangeType, period, dateMin, dateMax, outputVariable } = inputs;

  // Build query parameters based on date range type
  const queryParams = new URLSearchParams();

  if (dateRangeType === 'custom') {
    // Validate date format (simple check)
    if (!dateMin || !dateMax) {
      throw new Error(
        'Start date and end date are required for custom date range',
      );
    }

    queryParams.append('date_min', dateMin);
    queryParams.append('date_max', dateMax);
    log(
      `Retrieving sales report for custom date range: ${dateMin} to ${dateMax}`,
    );
  } else {
    // Use predefined period
    if (period) {
      queryParams.append('period', period);

      // Map period to user-friendly text for logging
      const periodMap: Record<string, string> = {
        day: 'today',
        week: 'this week',
        month: 'this month',
        last_month: 'last month',
        year: 'this year',
      };

      log(`Retrieving sales report for ${periodMap[period] || period}`);
    }
  }

  // Construct the API URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/reports/sales`;
  const apiUrl = `${endpoint}?${queryParams.toString()}`;

  // Create authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  try {
    // Make the API request
    log('Connecting to WooCommerce API...');

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
    const salesData = await response.json();

    if (!Array.isArray(salesData) || salesData.length === 0) {
      log('No sales data found for the specified period');
    } else {
      log(
        `Successfully retrieved sales report with ${salesData[0]?.total_orders || 0} orders`,
      );
    }

    // Set the output variable with the sales report data
    setOutput(outputVariable, salesData);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error retrieving sales report: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while retrieving sales report');
  }
};
