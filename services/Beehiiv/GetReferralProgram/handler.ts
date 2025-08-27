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
  const { publicationId, limit, page, outputVariable } = inputs;

  if (!publicationId) {
    throw new Error('Publication ID is required.');
  }

  log(`Fetching referral program details for publication: ${publicationId}`);

  try {
    // Initialize the Beehiiv client
    const client = new BeehiivClient({ token: apiKey });

    // Prepare query parameters
    const queryParams: Record<string, any> = {};

    if (limit) {
      queryParams.limit = parseInt(limit, 10);
      log(`Setting results limit to: ${limit}`);
    }

    if (page) {
      queryParams.page = parseInt(page, 10);
      log(`Retrieving page: ${page}`);
    }

    // Make the API request
    const response = await client.referralProgram.get(
      publicationId,
      queryParams,
    );

    log(
      `Successfully retrieved referral program details with ${response.data?.length || 0} milestones`,
    );

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error(
          `Publication not found: ${publicationId}. Please check the publication ID and try again.`,
        );
      } else if (error.message.includes('429')) {
        throw new Error('Too many requests. Please try again later.');
      } else {
        throw new Error(`Failed to fetch referral program: ${error.message}`);
      }
    } else {
      throw new Error(
        'An unknown error occurred while fetching the referral program.',
      );
    }
  }
};
