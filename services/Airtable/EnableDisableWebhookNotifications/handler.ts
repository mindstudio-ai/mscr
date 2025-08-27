export const handler = async ({
  inputs,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing Airtable authentication token');
  }

  // Extract inputs
  const { baseId, webhookId, enable } = inputs;

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }
  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  // Convert string to boolean
  const enableBoolean = enable === 'true';
  const action = enableBoolean ? 'enabling' : 'disabling';

  log(
    `${action} webhook notifications for webhook ${webhookId} in base ${baseId}...`,
  );

  try {
    // Construct the API URL
    const url = `https://api.airtable.com/v0/bases/${baseId}/webhooks/${webhookId}/enableNotifications`;

    // Make the API request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        enable: enableBoolean,
      }),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Failed to ${action} webhook notifications: ${response.status} ${response.statusText} - ${errorData}`,
      );
    }

    log(
      `Successfully ${enableBoolean ? 'enabled' : 'disabled'} webhook notifications`,
    );
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      `Unknown error occurred while ${action} webhook notifications`,
    );
  }
};
