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
  // Get API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your Beehiiv API key in the connector settings.',
    );
  }

  // Get inputs
  const { publicationId, customFieldId } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!customFieldId) {
    throw new Error('Custom Field ID is required');
  }

  // Initialize Beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  try {
    log(
      `Deleting custom field ${customFieldId} from publication ${publicationId}...`,
    );

    // Delete the custom field
    await client.customFields.delete(publicationId, customFieldId);

    log(`Custom field successfully deleted`);
  } catch (error: any) {
    // Handle specific error cases
    if (error.response?.status === 404) {
      throw new Error(
        `Not found: Either the publication or custom field doesn't exist`,
      );
    } else if (error.response?.status === 429) {
      throw new Error(`Rate limit exceeded. Please try again later.`);
    } else if (error.response?.status === 400) {
      throw new Error(
        `Bad request: ${error.message || 'Invalid parameters provided'}`,
      );
    } else {
      throw new Error(
        `Failed to delete custom field: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
