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

  // Validate environment variables
  if (!url) {
    throw new Error('Missing WooCommerce store URL');
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error('Missing WooCommerce API credentials');
  }

  // Extract and validate required inputs
  const { name, country, rate, outputVariable } = inputs;

  if (!name) {
    throw new Error('Tax rate name is required');
  }
  if (!country) {
    throw new Error('Country code is required');
  }
  if (!rate) {
    throw new Error('Tax rate is required');
  }
  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  // Extract optional inputs
  const {
    state,
    cities,
    postcodes,
    class: taxClass = 'standard',
    priority = '1',
    shipping = 'true',
    compound = 'false',
    order = '1',
  } = inputs;

  // Process string arrays
  const citiesArray = cities
    ? cities.split(',').map((city) => city.trim())
    : undefined;
  const postcodesArray = postcodes
    ? postcodes.split(',').map((postcode) => postcode.trim())
    : undefined;

  // Construct the request payload
  const payload: Record<string, any> = {
    name,
    country,
    rate,
  };

  // Add optional fields if they exist
  if (state) {
    payload.state = state;
  }
  if (citiesArray && citiesArray.length > 0) {
    payload.cities = citiesArray;
  }
  if (postcodesArray && postcodesArray.length > 0) {
    payload.postcodes = postcodesArray;
  }
  if (taxClass) {
    payload.class = taxClass;
  }
  if (priority) {
    payload.priority = parseInt(priority, 10);
  }
  if (shipping) {
    payload.shipping = shipping === 'true';
  }
  if (compound) {
    payload.compound = compound === 'true';
  }
  if (order) {
    payload.order = parseInt(order, 10);
  }

  // Construct the API endpoint
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/taxes`;

  // Encode credentials for Basic Auth
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(
    `Creating tax rate "${name}" for ${country}${state ? `-${state}` : ''}...`,
  );

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Parse the response
    const data = await response.json();

    // Check for errors
    if (!response.ok) {
      const errorMessage = data.message || 'Unknown error occurred';
      throw new Error(`Failed to create tax rate: ${errorMessage}`);
    }

    log(`Successfully created tax rate "${data.name}" with ID: ${data.id}`);

    // Set the output variable with the created tax rate data
    setOutput(outputVariable, data);
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
