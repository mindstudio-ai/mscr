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
  const { campaignId, count, offset, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing Mailchimp API Key. Please check your configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please check your configuration.',
    );
  }

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare parameters for the API call
  const params: Record<string, any> = {};

  // Add optional parameters if provided
  if (count) {
    params.count = parseInt(count, 10);
  }

  if (offset) {
    params.offset = parseInt(offset, 10);
  }

  log(`Retrieving recipients for campaign ${campaignId}...`);

  try {
    // Make the API call to get campaign recipients
    const response = await mailchimp.reports.getCampaignRecipients(
      campaignId,
      params,
    );

    log(
      `Successfully retrieved ${response.sent_to.length} recipients out of ${response.total_items} total`,
    );

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error retrieving campaign recipients: ${error.message}`);
    }
  }
};
