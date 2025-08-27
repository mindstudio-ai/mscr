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
  const { campaignId, successVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your MailChimp API Key in the service settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the service settings.',
    );
  }

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required.');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    log(`Resuming RSS campaign with ID: ${campaignId}`);

    // Call the MailChimp API to resume the RSS campaign
    await mailchimp.campaigns.resumeRssCampaign(campaignId);

    log('RSS campaign resumed successfully');

    // Set the output variable with success status
    setOutput(successVariable, true);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`MailChimp API Error: ${error.response.body.detail}`);
    } else {
      throw new Error(
        `Error resuming RSS campaign: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
