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
  const { campaignId, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
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

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required.');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    log(`Attempting to unschedule campaign with ID: ${campaignId}`);

    // Call the Mailchimp API to unschedule the campaign
    await mailchimp.campaigns.unschedule(campaignId);

    // Set success output
    const successMessage = `Campaign ${campaignId} has been successfully unscheduled.`;
    log(successMessage);
    setOutput(outputVariable, { success: true, message: successMessage });
  } catch (error) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error unscheduling campaign: ${errorMessage}`);

    // Provide more specific error messages for common issues
    if (errorMessage.includes('404')) {
      throw new Error(
        `Campaign with ID ${campaignId} not found. Please check the Campaign ID and try again.`,
      );
    } else if (errorMessage.includes('403')) {
      throw new Error(
        'Permission denied. Please check your API credentials and permissions.',
      );
    } else if (errorMessage.includes('not scheduled')) {
      throw new Error(`Campaign ${campaignId} is not currently scheduled.`);
    } else {
      throw new Error(`Failed to unschedule campaign: ${errorMessage}`);
    }
  }
};
