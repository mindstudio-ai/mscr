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
    throw new Error('Missing WooCommerce Store URL in environment variables');
  }
  if (!consumerKey) {
    throw new Error(
      'Missing WooCommerce Consumer Key in environment variables',
    );
  }
  if (!consumerSecret) {
    throw new Error(
      'Missing WooCommerce Consumer Secret in environment variables',
    );
  }

  // Extract inputs
  const { groupId, settingId, outputVariable } = inputs;

  // Validate inputs
  if (!groupId) {
    throw new Error('Group ID is required');
  }
  if (!settingId) {
    throw new Error('Setting ID is required');
  }

  // Construct the API URL, ensuring no trailing slash in the base URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const apiUrl = `${baseUrl}/wp-json/wc/v3/settings/${groupId}/${settingId}`;

  log(`Retrieving setting '${settingId}' from group '${groupId}'...`);

  try {
    // Create the Authorization header for Basic Auth
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
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const settingData = await response.json();

    log(`Successfully retrieved setting '${settingData.id}'`);

    // Set the output variable with the setting data
    setOutput(outputVariable, settingData);
  } catch (error) {
    // Handle any errors that occur during the API request
    if (error instanceof Error) {
      log(`Error retrieving setting: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};
