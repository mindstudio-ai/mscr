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
      'Missing API Key. Please configure the beehiiv API key in the integration settings.',
    );
  }

  // Extract inputs with defaults
  const {
    publicationId,
    audience = 'all',
    platform = 'all',
    status = 'all',
    limit = '10',
    page = '1',
    orderBy = 'created',
    direction = 'desc',
    includeStats = 'false',
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  // Initialize beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  log(`Fetching posts for publication: ${publicationId}`);

  try {
    // Build query parameters
    const queryParams: Record<string, any> = {
      audience,
      platform,
      status,
      limit: parseInt(limit, 10),
      page: parseInt(page, 10),
      order_by: orderBy,
      direction,
    };

    // Add expand parameter if stats are requested
    if (includeStats === 'true') {
      queryParams.expand = ['stats'];
    }

    // Make API request
    log('Making request to beehiiv API...');
    const response = await client.posts.list(publicationId, queryParams);

    // Set output
    log(
      `Successfully retrieved ${response.data.length} posts (page ${response.page} of ${response.total_pages})`,
    );
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error(
          `Publication not found: ${publicationId}. Please check the Publication ID and try again.`,
        );
      } else if (
        error.message.includes('401') ||
        error.message.includes('403')
      ) {
        throw new Error(
          'Authentication failed. Please check your API key and ensure it has the necessary permissions.',
        );
      } else if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Failed to fetch posts: ${error.message}`);
      }
    } else {
      throw new Error('An unknown error occurred while fetching posts');
    }
  }
};
