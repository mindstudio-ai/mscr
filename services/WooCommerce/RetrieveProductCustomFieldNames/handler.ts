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
    throw new Error('Missing Store URL in environment variables');
  }
  if (!consumerKey) {
    throw new Error('Missing Consumer Key in environment variables');
  }
  if (!consumerSecret) {
    throw new Error('Missing Consumer Secret in environment variables');
  }

  // Extract input parameters
  const {
    perPage = '10',
    page = '1',
    search,
    order = 'desc',
    outputVariable,
  } = inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (perPage) {
    queryParams.append('per_page', perPage);
  }
  if (page) {
    queryParams.append('page', page);
  }
  if (search) {
    queryParams.append('search', search);
  }
  if (order) {
    queryParams.append('order', order);
  }

  // Construct the full API URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `/wp-json/wc/v3/products/custom-fields/names`;
  const fullUrl = `${baseUrl}${endpoint}?${queryParams.toString()}`;

  // Create the authentication token for Basic Auth
  const authToken = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Retrieving product custom field names from your WooCommerce store...`);

  try {
    // Make the API request
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authToken}`,
        Accept: 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response
    const customFieldNames = await response.json();

    // Validate the response
    if (!Array.isArray(customFieldNames)) {
      throw new Error(
        'Unexpected response format: expected an array of custom field names',
      );
    }

    log(`Successfully retrieved ${customFieldNames.length} custom field names`);

    // Set the output variable
    setOutput(outputVariable, customFieldNames);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};
