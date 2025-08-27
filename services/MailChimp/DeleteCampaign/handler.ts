import mailchimp from '@mailchimp/mailchimp_marketing';

export const handler = async ({
  inputs,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your Mailchimp API key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your Mailchimp server prefix (e.g., us1) in the connector settings.',
    );
  }

  // Extract inputs
  const { campaignId, confirmationMessage = 'Campaign deleted successfully' } =
    inputs;

  // Validate inputs
  if (!campaignId) {
    throw new Error(
      'Campaign ID is required. Please provide a valid campaign ID.',
    );
  }

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Log the action
  log(`Deleting campaign with ID: ${campaignId}`);

  try {
    // Delete the campaign
    await mailchimp.campaigns.remove(campaignId);

    // Log success
    log(confirmationMessage);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(
        `Failed to delete campaign: ${detail} (Status: ${status})`,
      );
    } else {
      throw new Error(
        `Failed to delete campaign: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
