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

  // Extract inputs
  const { perPage, page, search, order, outputVariable } = inputs;

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

  // Build request URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const requestUrl = `${baseUrl}/wp-json/wc/v3/products/custom-fields/names?${queryParams.toString()}`;

  log(`Retrieving product custom field names from ${baseUrl}`);

  try {
    // Create authorization header for Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the request
    const response = await fetch(requestUrl, {
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
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response
    const customFieldNames = await response.json();

    if (!Array.isArray(customFieldNames)) {
      throw new Error(
        'Unexpected response format: expected an array of custom field names',
      );
    }

    log(`Successfully retrieved ${customFieldNames.length} custom field names`);

    // Set the output
    setOutput(outputVariable, customFieldNames);
  } catch (error) {
    if (error instanceof Error) {
      // Handle specific error cases
      if (error.message.includes('401')) {
        throw new Error(
          'Authentication failed. Please check your Consumer Key and Consumer Secret.',
        );
      } else if (error.message.includes('404')) {
        throw new Error(
          'The WooCommerce API endpoint was not found. Please check your Store URL.',
        );
      } else if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw error;
      }
    } else {
      throw new Error(`Unknown error occurred: ${String(error)}`);
    }
  }
};
