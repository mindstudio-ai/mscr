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
      'Missing API Key. Please configure your beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const { publicationId, postId, outputVariable } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }
  if (!postId) {
    throw new Error('Post ID is required');
  }

  log(`Preparing to delete post ${postId} from publication ${publicationId}`);

  try {
    // Initialize the beehiiv client
    const client = new BeehiivClient({ token: apiKey });

    // Delete the post
    log('Sending delete request to beehiiv...');
    await client.posts.delete(postId, publicationId);

    // Set success message
    const successMessage = `Post ${postId} has been successfully deleted or archived.`;
    log(successMessage);
    setOutput(outputVariable, successMessage);
  } catch (error: any) {
    // Handle specific error cases
    if (error.response?.status === 404) {
      throw new Error(`Post or publication not found. Please check your IDs.`);
    } else if (error.response?.status === 429) {
      throw new Error(`Too many requests. Please try again later.`);
    } else if (error.response?.status === 400) {
      throw new Error(
        `Bad request: ${error.message || 'Please check your inputs'}`,
      );
    } else {
      throw new Error(`Failed to delete post: ${error.message || error}`);
    }
  }
};
