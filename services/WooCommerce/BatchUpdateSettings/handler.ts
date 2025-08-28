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
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials (Consumer Key or Consumer Secret)',
    );
  }

  // Extract inputs
  const { groupId, settings, outputVariable } = inputs;

  // Validate inputs
  if (!groupId) {
    throw new Error('Settings Group ID is required');
  }
  if (!settings || !Array.isArray(settings) || settings.length === 0) {
    throw new Error(
      'Settings must be a non-empty array of objects with id and value properties',
    );
  }

  // Normalize the base URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint URL
  const endpoint = `${baseUrl}/wp-json/wc/v3/settings/${groupId}/batch`;

  // Prepare the request payload
  const payload = {
    update: settings,
  };

  log(`Updating ${settings.length} settings in the '${groupId}' group...`);

  try {
    // Create Basic Auth credentials
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`,
    ).toString('base64');

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(payload),
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

    log(`Successfully updated ${data.update?.length || 0} settings`);

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    log(`Error updating WooCommerce settings: ${error.message}`);
    throw error;
  }
};
