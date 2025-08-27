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
  // Extract inputs
  const {
    postId,
    publicationId,
    includeStats,
    includeContent,
    outputVariable,
  } = inputs;

  // Validate required environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your Beehiiv API Key in the service settings.',
    );
  }

  // Validate required inputs
  if (!postId) {
    throw new Error('Post ID is required');
  }

  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  try {
    log(`Retrieving post ${postId} from publication ${publicationId}...`);

    // Initialize the Beehiiv client
    const client = new BeehiivClient({ token: apiKey });

    // Build the expand parameters based on user selections
    const expandParams: string[] = [];

    // Add stats if requested
    if (includeStats === 'true') {
      expandParams.push('stats');
    }

    // Add content based on selection
    if (includeContent === 'all') {
      expandParams.push(
        'free_web_content',
        'free_email_content',
        'free_rss_content',
        'premium_web_content',
        'premium_email_content',
      );
    } else if (includeContent === 'free_web_content') {
      expandParams.push('free_web_content');
    } else if (includeContent === 'free_email_content') {
      expandParams.push('free_email_content');
    } else if (includeContent === 'premium_content') {
      expandParams.push('premium_web_content', 'premium_email_content');
    }

    // Make the API request
    const options =
      expandParams.length > 0 ? { expand: expandParams } : undefined;
    const response = await client.posts.get(postId, publicationId, options);

    log(`Successfully retrieved post: ${response.data.title}`);

    // Set the output variable with the post data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error(
          `Post not found. Please check your Post ID and Publication ID.`,
        );
      } else if (
        error.message.includes('401') ||
        error.message.includes('403')
      ) {
        throw new Error(`Authentication error. Please check your API key.`);
      } else {
        throw new Error(`Error retrieving post: ${error.message}`);
      }
    } else {
      throw new Error(`Unknown error occurred: ${String(error)}`);
    }
  }
};
