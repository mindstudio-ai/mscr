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
    throw new Error(
      'Missing Store URL. Please configure your WooCommerce store URL in the service settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce Consumer Key and Consumer Secret in the service settings.',
    );
  }

  // Extract inputs
  const { attributeId, termId, outputVariable } = inputs;

  // Validate required inputs
  if (!attributeId) {
    throw new Error(
      'Missing Attribute ID. Please provide a valid attribute ID.',
    );
  }

  if (!termId) {
    throw new Error('Missing Term ID. Please provide a valid term ID.');
  }

  // Construct the API URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const apiUrl = `${baseUrl}/wp-json/wc/v3/products/attributes/${attributeId}/terms/${termId}`;

  // Create Basic Auth credentials
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(
    `Retrieving attribute term with ID ${termId} for attribute ${attributeId}...`,
  );

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
        `Failed to retrieve attribute term: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const attributeTerm = await response.json();

    log(`Successfully retrieved attribute term: ${attributeTerm.name}`);

    // Set the output
    setOutput(outputVariable, attributeTerm);
  } catch (error) {
    // Handle any errors
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
