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
    throw new Error('Missing Store URL in environment variables');
  }
  if (!consumerKey) {
    throw new Error('Missing Consumer Key in environment variables');
  }
  if (!consumerSecret) {
    throw new Error('Missing Consumer Secret in environment variables');
  }

  // Extract inputs
  const { zoneName, outputVariable } = inputs;

  // Validate inputs
  if (!zoneName) {
    throw new Error('Zone name is required');
  }

  // Construct the API endpoint URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/shipping/zones`;

  log(`Creating shipping zone "${zoneName}" in WooCommerce...`);

  try {
    // Create the authentication string for Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify({
        name: zoneName,
      }),
    });

    // Handle response
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Failed to create shipping zone: ${response.status} ${response.statusText} - ${errorData}`,
      );
    }

    const data = await response.json();

    log(`Successfully created shipping zone "${zoneName}" with ID: ${data.id}`);

    // Set the output variable with the complete response
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
