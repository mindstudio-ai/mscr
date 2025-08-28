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
      "Missing WooCommerce Store URL. Please configure the 'url' environment variable.",
    );
  }
  if (!consumerKey) {
    throw new Error(
      "Missing WooCommerce Consumer Key. Please configure the 'consumerKey' environment variable.",
    );
  }
  if (!consumerSecret) {
    throw new Error(
      "Missing WooCommerce Consumer Secret. Please configure the 'consumerSecret' environment variable.",
    );
  }

  // Extract output variable name from inputs
  const { outputVariable } = inputs;

  // Construct the API endpoint URL
  const apiUrl = `${url}/wp-json/wc/v3/reports`;

  log(`Connecting to WooCommerce store at ${url}`);
  log('Retrieving list of available reports...');

  try {
    // Create authorization header for Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

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
        `WooCommerce API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response
    const reports = await response.json();

    log(`Successfully retrieved ${reports.length} report types`);

    // Set the output variable with the reports data
    setOutput(outputVariable, reports);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while connecting to WooCommerce',
    );
  }
};
