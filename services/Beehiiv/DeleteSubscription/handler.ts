import { BeehiivClient } from 'beehiiv';

export const handler = async ({
  inputs,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const { publicationId, subscriptionId, confirmation } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }
  if (!subscriptionId) {
    throw new Error('Subscription ID is required');
  }
  if (confirmation !== 'confirmed') {
    throw new Error('You must confirm the deletion to proceed');
  }

  // Validate ID formats
  if (!publicationId.startsWith('pub_')) {
    throw new Error("Publication ID must start with 'pub_'");
  }
  if (!subscriptionId.startsWith('sub_')) {
    throw new Error("Subscription ID must start with 'sub_'");
  }

  // Initialize the beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  try {
    log(
      `Deleting subscription ${subscriptionId} from publication ${publicationId}...`,
    );

    // Make the delete request
    await client.subscriptions.delete(subscriptionId, publicationId);

    // If we get here, the deletion was successful (204 No Content)
    log('Subscription deleted successfully');
  } catch (error: any) {
    // Handle common error cases
    if (error.response?.status === 404) {
      throw new Error(
        'Subscription or publication not found. Please check the IDs and try again.',
      );
    } else if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else if (error.response?.status === 400) {
      throw new Error(
        `Bad request: ${error.message || 'Please check your inputs and try again.'}`,
      );
    } else {
      // Generic error handling
      throw new Error(
        `Failed to delete subscription: ${error.message || 'Unknown error occurred'}`,
      );
    }
  }
};
