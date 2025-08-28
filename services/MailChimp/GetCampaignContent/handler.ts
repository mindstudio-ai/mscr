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
  const { campaignId, fields, excludeFields, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'MailChimp API Key is required. Please configure it in the service settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'MailChimp Server Prefix is required. Please configure it in the service settings.',
    );
  }

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required.');
  }

  // Initialize the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving content for campaign: ${campaignId}`);

  try {
    // Prepare query parameters
    const queryParams: Record<string, any> = {};

    if (fields) {
      queryParams.fields = fields;
    }

    if (excludeFields) {
      queryParams.exclude_fields = excludeFields;
    }

    // Make the API call to get campaign content
    const response = await mailchimp.campaigns.getContent(
      campaignId,
      queryParams,
    );

    log('Successfully retrieved campaign content');

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error(
          `Campaign with ID ${campaignId} not found. Please check the Campaign ID and try again.`,
        );
      } else {
        throw new Error(
          `Failed to retrieve campaign content: ${error.message}`,
        );
      }
    } else {
      throw new Error(
        'An unknown error occurred while retrieving campaign content',
      );
    }
  }
};
