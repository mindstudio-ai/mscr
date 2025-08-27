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
      'Missing API Key. Please add your Beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const { publicationId, segmentId, limit, page, outputVariable } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!segmentId) {
    throw new Error('Segment ID is required');
  }

  // Create options object for pagination parameters
  const options: Record<string, any> = {};

  if (limit) {
    options.limit = parseInt(limit, 10);
    // Ensure limit is within valid range (1-100)
    if (isNaN(options.limit) || options.limit < 1 || options.limit > 100) {
      throw new Error('Limit must be a number between 1 and 100');
    }
  }

  if (page) {
    options.page = parseInt(page, 10);
    if (isNaN(options.page) || options.page < 1) {
      throw new Error('Page must be a positive number');
    }
  }

  // Initialize the Beehiiv client
  log('Connecting to Beehiiv...');
  const client = new BeehiivClient({ token: apiKey });

  try {
    // Log the operation being performed
    log(
      `Retrieving subscribers for segment ${segmentId} in publication ${publicationId}...`,
    );

    // Make the API request
    const response = await client.segments.get(
      publicationId,
      segmentId,
      options,
    );

    // Log success message with count information
    const subscriberCount = response.data?.length || 0;
    log(
      `Successfully retrieved ${subscriberCount} subscribers (page ${response.page || 1} of ${response.total_pages || 1})`,
    );

    // Set the output variable with the full response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      // Check for common error patterns
      if (error.message.includes('404')) {
        throw new Error(
          `Publication or segment not found. Please verify your Publication ID and Segment ID are correct.`,
        );
      } else if (
        error.message.includes('401') ||
        error.message.includes('403')
      ) {
        throw new Error(`Authentication error. Please check your API key.`);
      } else if (error.message.includes('429')) {
        throw new Error(`Rate limit exceeded. Please try again later.`);
      }

      // If it's another type of error, throw with the original message
      throw error;
    }

    // For unknown errors
    throw new Error(`An unexpected error occurred: ${String(error)}`);
  }
};
