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
  // Get API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const { publicationId, subscriptionId, tags, outputVariable } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }
  if (!subscriptionId) {
    throw new Error('Subscription ID is required');
  }
  if (!tags) {
    throw new Error('Tags are required');
  }

  // Parse comma-separated tags into an array and trim whitespace
  const tagsArray = tags.split(',').map((tag: string) => tag.trim());

  // Initialize the beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  log(
    `Adding tags to subscription ${subscriptionId} in publication ${publicationId}...`,
  );

  try {
    // Call the beehiiv API to add tags to the subscription
    const response = await client.subscriptionTags.create(
      publicationId,
      subscriptionId,
      { tags: tagsArray },
    );

    log(`Successfully added tags: ${tagsArray.join(', ')}`);

    // Set the output variable with the updated subscription data
    setOutput(outputVariable, response.data);
  } catch (error: any) {
    // Handle specific error cases
    if (error.response?.status === 400) {
      throw new Error(
        `Bad request: ${error.message}. Please check your inputs.`,
      );
    } else if (error.response?.status === 404) {
      throw new Error(
        `Publication or subscription not found. Please verify your IDs.`,
      );
    } else if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else {
      throw new Error(`Error adding tags: ${error.message}`);
    }
  }
};
