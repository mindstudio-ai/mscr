export const handler = async ({
  inputs,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error('Missing API Key. Please check your connection settings.');
  }

  const { publicationId, endpointId } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!endpointId) {
    throw new Error('Webhook ID is required');
  }

  // Construct the API URL
  const url = `https://api.beehiiv.com/v2/publications/${publicationId}/webhooks/${endpointId}`;

  log(`Deleting webhook ${endpointId} from publication ${publicationId}...`);

  try {
    // Make the DELETE request
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle response based on status code
    if (response.status === 204) {
      log('Webhook deleted successfully');
      return;
    }

    // Handle error responses
    let errorData = {};
    try {
      errorData = await response.json();
    } catch (e) {
      // If response isn't JSON, continue with generic error
    }

    if (response.status === 404) {
      throw new Error(
        `Not found: The webhook or publication could not be found. Please check your IDs.`,
      );
    } else if (response.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else if (response.status === 400) {
      throw new Error(`Bad request: ${JSON.stringify(errorData)}`);
    } else {
      throw new Error(
        `Error deleting webhook: ${response.status} ${JSON.stringify(errorData)}`,
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to delete webhook: ${String(error)}`);
  }
};
