import * as mailchimp from '@mailchimp/mailchimp_marketing';

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
  const { campaignId, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required inputs and environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your Mailchimp Server Prefix in the connector settings.',
    );
  }

  if (!campaignId) {
    throw new Error(
      'Campaign ID is required. Please provide a valid Mailchimp campaign ID.',
    );
  }

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey: apiKey,
    server: serverPrefix,
  });

  try {
    // Log the operation being performed
    log(`Pausing RSS-driven campaign with ID: ${campaignId}`);

    // Call the Mailchimp API to pause the campaign
    await mailchimp.campaigns.pauseRssCampaign(campaignId);

    // Log success
    log(`Successfully paused campaign ${campaignId}`);

    // Set the output variable
    setOutput(outputVariable, {
      success: true,
      message: `Campaign ${campaignId} was successfully paused`,
      campaignId: campaignId,
    });
  } catch (error) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error pausing campaign: ${errorMessage}`);

    // Throw the error to be handled by the platform
    throw new Error(`Failed to pause campaign: ${errorMessage}`);
  }
};
