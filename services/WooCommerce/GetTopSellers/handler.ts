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

  if (!url) {
    throw new Error('Missing WooCommerce store URL');
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error('Missing WooCommerce API credentials');
  }

  // Extract inputs
  const { period, dateMin, dateMax, outputVariable } = inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (period) {
    queryParams.append('period', period);
    log(`Fetching top sellers for period: ${period}`);
  }

  if (dateMin) {
    queryParams.append('date_min', dateMin);
    log(`Using start date: ${dateMin}`);
  }

  if (dateMax) {
    queryParams.append('date_max', dateMax);
    log(`Using end date: ${dateMax}`);
  }

  // Construct the API endpoint URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/reports/top_sellers`;
  const apiUrl = `${endpoint}?${queryParams.toString()}`;

  // Create authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  try {
    log('Requesting top sellers report from WooCommerce...');

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    const data = await response.json();

    log(`Successfully retrieved ${data.length} top selling products`);

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve top sellers: ${error.message}`);
    }
    throw new Error('An unknown error occurred');
  }
};
