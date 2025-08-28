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
      'Missing Store URL. Please configure your WooCommerce connection.',
    );
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce connection with valid Consumer Key and Secret.',
    );
  }

  // Extract inputs
  const { zoneId, force, outputVariable } = inputs;

  // Validate required inputs
  if (!zoneId) {
    throw new Error('Shipping Zone ID is required');
  }

  // Create the API endpoint URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/shipping/zones/${zoneId}`;
  const queryParams = new URLSearchParams({ force: force || 'true' });
  const requestUrl = `${endpoint}?${queryParams}`;

  // Create Basic Auth credentials
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Deleting shipping zone with ID: ${zoneId}`);

  try {
    // Make the DELETE request
    const response = await fetch(requestUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Handle response
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.message ||
        `Server returned ${response.status} ${response.statusText}`;
      throw new Error(`Failed to delete shipping zone: ${errorMessage}`);
    }

    const deletedZone = await response.json();
    log(
      `Successfully deleted shipping zone "${deletedZone.name}" (ID: ${deletedZone.id})`,
    );

    // Set the output variable with the deleted shipping zone details
    setOutput(outputVariable, deletedZone);
  } catch (error) {
    log(`Error: ${error.message}`);
    throw error;
  }
};
