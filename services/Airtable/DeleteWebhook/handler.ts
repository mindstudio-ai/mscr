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
  // Extract inputs
  const { baseId, webhookId, outputVariable } = inputs;

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }

  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  // Check for authentication token
  const token = process.env.token;
  if (!token) {
    throw new Error('Airtable authentication token is missing');
  }

  // Construct the API URL
  const url = `https://api.airtable.com/v0/bases/${baseId}/webhooks/${webhookId}`;

  log(`Deleting webhook ${webhookId} from base ${baseId}...`);

  try {
    // Make the DELETE request to Airtable API
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      // Handle different error cases
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Airtable token.',
        );
      } else if (response.status === 403) {
        throw new Error(
          'Permission denied. Creator-level permissions are required to delete webhooks.',
        );
      } else if (response.status === 404) {
        throw new Error(
          `Webhook with ID ${webhookId} not found in base ${baseId}.`,
        );
      } else {
        // Try to get more details from the error response
        const errorText = await response.text();
        throw new Error(
          `Failed to delete webhook: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }
    }

    // Success - webhook was deleted
    log(`Webhook successfully deleted.`);

    // Set the output variable to indicate success
    setOutput(outputVariable, true);
  } catch (error) {
    // Handle network or other errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(`An unknown error occurred: ${String(error)}`);
  }
};
