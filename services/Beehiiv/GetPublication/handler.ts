import { BeehiivClient, Beehiiv } from 'beehiiv';

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
  const { publicationId, includeStats, outputVariable } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  // Get API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error('Missing API Key');
  }

  // Initialize the Beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  try {
    log(`Fetching publication data for ID: ${publicationId}`);

    // Prepare request options
    const options: { expand?: string[] } = {};

    // Add expand parameter if statistics are requested
    if (includeStats && includeStats !== 'none') {
      options.expand = [includeStats];
    }

    // Make the API request
    const response = await client.publications.get(publicationId, options);

    log('Publication data retrieved successfully');

    // Set the output variable with the publication data
    setOutput(outputVariable, response.data);
  } catch (error: any) {
    // Handle common errors
    if (error.status === 404) {
      throw new Error(`Publication not found with ID: ${publicationId}`);
    } else if (error.status === 401 || error.status === 403) {
      throw new Error('Authentication failed. Please check your API key.');
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      // Log the error for debugging
      log(`Error fetching publication: ${error.message}`);
      throw new Error(`Failed to fetch publication: ${error.message}`);
    }
  }
};
