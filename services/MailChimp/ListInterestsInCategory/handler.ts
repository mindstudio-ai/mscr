import mailchimp from '@mailchimp/mailchimp_marketing';

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
  const { listId, interestCategoryId, count, offset, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the connector settings.',
    );
  }

  // Initialize the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(
    `Fetching interests for category ${interestCategoryId} in list ${listId}...`,
  );

  try {
    // Prepare optional parameters
    const params: Record<string, any> = {};

    if (count !== undefined) {
      params.count = parseInt(count, 10);
    }

    if (offset !== undefined) {
      params.offset = parseInt(offset, 10);
    }

    // Make the API request
    const response = await mailchimp.lists.getListInterestCategoryInterests(
      listId,
      interestCategoryId,
      params,
    );

    log(`Successfully retrieved ${response.interests.length} interests.`);

    // Set the output variable
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle common errors
    if (error.status === 401) {
      throw new Error(
        'Authentication failed. Please check your API Key and Server Prefix.',
      );
    } else if (error.status === 404) {
      throw new Error(
        'Resource not found. Please check your List ID and Interest Category ID.',
      );
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      // Log the detailed error for debugging
      log(`Error: ${error.message || 'Unknown error occurred'}`);
      throw new Error(
        `Failed to fetch interests: ${error.message || 'Unknown error occurred'}`,
      );
    }
  }
};
