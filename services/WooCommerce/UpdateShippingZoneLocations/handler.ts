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
      "Missing WooCommerce store URL. Please configure the 'Store URL' in the connector settings.",
    );
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      "Missing WooCommerce API credentials. Please configure the 'API Consumer Key' and 'API Consumer Secret' in the connector settings.",
    );
  }

  // Extract and validate inputs
  const { zoneId, locations, outputVariable } = inputs;

  if (!zoneId) {
    throw new Error(
      'Missing Shipping Zone ID. Please provide a valid zone ID.',
    );
  }

  if (!locations || !Array.isArray(locations)) {
    throw new Error(
      'Invalid locations format. Please provide a valid array of location objects.',
    );
  }

  // Normalize the base URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint URL
  const endpoint = `${baseUrl}/wp-json/wc/v3/shipping/zones/${zoneId}/locations`;

  log(`Updating locations for shipping zone ${zoneId}...`);

  try {
    // Create Basic Auth credentials
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`,
    ).toString('base64');

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(locations),
    });

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const updatedLocations = await response.json();

    log(
      `Successfully updated ${updatedLocations.length} locations for shipping zone ${zoneId}`,
    );

    // Set the output variable with the updated locations
    setOutput(outputVariable, updatedLocations);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error updating shipping zone locations: ${error.message}`);
      throw error;
    }
    throw new Error(
      `Unknown error occurred while updating shipping zone locations`,
    );
  }
};
