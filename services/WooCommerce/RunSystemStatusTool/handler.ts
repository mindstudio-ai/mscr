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

  // Extract inputs
  const { toolId, confirm, outputVariable } = inputs;

  // Validate environment variables
  if (!url) {
    throw new Error(
      'Missing store URL. Please configure the WooCommerce store URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure the WooCommerce API consumer key and secret in the connector settings.',
    );
  }

  // Validate confirm is set to true before proceeding
  if (confirm !== 'true') {
    throw new Error(
      "Operation cancelled. You must confirm execution by selecting 'Yes, I confirm'.",
    );
  }

  // Construct the API endpoint URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/system_status/tools/${toolId}`;

  log(`Executing system status tool: ${toolId}`);

  try {
    // Create authorization header using Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ confirm: true }),
    });

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    const result = await response.json();

    // Log success or failure based on the API response
    if (result.success) {
      log(`Tool executed successfully: ${result.message}`);
    } else {
      log(`Tool execution completed but reported failure: ${result.message}`);
    }

    // Set the output variable with the complete result
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle errors
    log(`Error executing system status tool: ${error.message}`);
    throw error;
  }
};
