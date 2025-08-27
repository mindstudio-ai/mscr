import { BeehiivClient } from 'beehiiv';

export const handler = async ({
  inputs,
  setOutput,
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
      'Missing API Key. Please configure your Beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const { publicationId, segmentId, successVariable } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }
  if (!segmentId) {
    throw new Error('Segment ID is required');
  }

  log(`Deleting segment ${segmentId} from publication ${publicationId}...`);

  try {
    // Initialize the Beehiiv client
    const client = new BeehiivClient({ token: apiKey });

    // Delete the segment
    await client.segments.delete(publicationId, segmentId);

    log(`Successfully deleted segment ${segmentId}`);

    // Set the success output variable
    setOutput(successVariable, true);
  } catch (error) {
    // Handle specific error cases
    if (error.response?.status === 404) {
      throw new Error(
        `Segment or publication not found. Please check your IDs.`,
      );
    } else if (error.response?.status === 429) {
      throw new Error(`Rate limit exceeded. Please try again later.`);
    } else {
      // Log the error and throw a user-friendly message
      console.error('Error deleting segment:', error);
      throw new Error(
        `Failed to delete segment: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
