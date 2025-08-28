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
    throw new Error('Missing WooCommerce Store URL');
  }
  if (!consumerKey) {
    throw new Error('Missing WooCommerce Consumer Key');
  }
  if (!consumerSecret) {
    throw new Error('Missing WooCommerce Consumer Secret');
  }

  // Extract input parameters
  const { attributeId, termId, outputVariable } = inputs;

  // Validate input parameters
  if (!attributeId) {
    throw new Error('Missing Attribute ID');
  }
  if (!termId) {
    throw new Error('Missing Term ID');
  }

  // Format the base URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint
  const endpoint = `${baseUrl}/wp-json/wc/v3/products/attributes/${attributeId}/terms/${termId}`;

  log(
    `Retrieving product attribute term ${termId} for attribute ${attributeId}...`,
  );

  try {
    // Create Basic Auth credentials
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`,
    ).toString('base64');

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
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
    const termData = await response.json();

    log(`Successfully retrieved attribute term: ${termData.name}`);

    // Set the output variable with the term data
    setOutput(outputVariable, termData);
  } catch (error) {
    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error(
          `Attribute term not found. Please verify that attribute ID ${attributeId} and term ID ${termId} exist.`,
        );
      } else if (error.message.includes('401')) {
        throw new Error(
          'Authentication failed. Please check your WooCommerce API credentials.',
        );
      } else {
        throw new Error(`Error retrieving attribute term: ${error.message}`);
      }
    } else {
      throw new Error(
        'An unknown error occurred while retrieving the attribute term.',
      );
    }
  }
};
