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
      "Missing WooCommerce store URL. Please configure the 'url' environment variable.",
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      "Missing WooCommerce API credentials. Please configure the 'consumerKey' and 'consumerSecret' environment variables.",
    );
  }

  // Extract inputs
  const { groupId, settingId, value, outputVariable } = inputs;

  // Validate required inputs
  if (!groupId) {
    throw new Error('Missing required input: Group ID');
  }

  if (!settingId) {
    throw new Error('Missing required input: Setting ID');
  }

  if (value === undefined || value === null) {
    throw new Error('Missing required input: New Value');
  }

  // Construct the API endpoint
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/settings/${groupId}/${settingId}`;

  // Prepare request
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Updating WooCommerce setting ${settingId} in group ${groupId}...`);

  try {
    // Make the API request
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ value }),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    log(`Successfully updated setting ${settingId} to value: ${data.value}`);

    // Set the output variable
    setOutput(outputVariable, data);
  } catch (error) {
    log(`Error updating WooCommerce setting: ${error.message}`);
    throw error;
  }
};
