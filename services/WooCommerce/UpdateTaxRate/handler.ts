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
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials in environment variables',
    );
  }

  // Extract required inputs
  const { taxRateId, outputVariable } = inputs;
  if (!taxRateId) {
    throw new Error('Tax Rate ID is required');
  }

  // Create the request payload with only provided fields
  const payload: Record<string, any> = {};

  // Add optional fields to payload if they exist
  const optionalFields = [
    'name',
    'country',
    'state',
    'rate',
    'priority',
    'compound',
    'shipping',
    'class',
    'order',
  ];

  optionalFields.forEach((field) => {
    if (inputs[field] !== undefined && inputs[field] !== '') {
      // Convert string booleans to actual booleans
      if (field === 'compound' || field === 'shipping') {
        payload[field] = inputs[field] === 'true';
      } else {
        payload[field] = inputs[field];
      }
    }
  });

  // Handle cities and postcodes (convert comma-separated strings to arrays)
  if (inputs.cities && inputs.cities.trim() !== '') {
    payload.cities = inputs.cities
      .split(',')
      .map((city: string) => city.trim());
  }

  if (inputs.postcodes && inputs.postcodes.trim() !== '') {
    payload.postcodes = inputs.postcodes
      .split(',')
      .map((postcode: string) => postcode.trim());
  }

  // Construct the API endpoint
  const apiEndpoint = `${url.replace(/\/$/, '')}/wp-json/wc/v3/taxes/${taxRateId}`;

  // Log the update operation
  log(`Updating tax rate with ID: ${taxRateId}`);

  try {
    // Create Basic Auth credentials
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`,
    ).toString('base64');

    // Make the API request
    const response = await fetch(apiEndpoint, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Parse the response
    const responseData = await response.json();

    // Check for errors
    if (!response.ok) {
      const errorMessage = responseData.message || 'Unknown error occurred';
      throw new Error(
        `WooCommerce API Error (${response.status}): ${errorMessage}`,
      );
    }

    // Log success
    log(`Successfully updated tax rate: ${responseData.name || taxRateId}`);

    // Set the output variable
    setOutput(outputVariable, responseData);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error updating tax rate: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while updating tax rate');
  }
};
