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
  const { campaignId, confirmationMessage, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Mailchimp API Key is required. Please check your configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Mailchimp Server Prefix is required. Please check your configuration.',
    );
  }

  // Validate confirmation message
  if (confirmationMessage !== 'CONFIRM') {
    throw new Error(
      'Please type CONFIRM to proceed with campaign cancellation.',
    );
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    log(`Attempting to cancel campaign with ID: ${campaignId}...`);

    // Call the Mailchimp API to cancel the campaign
    await mailchimp.campaigns.cancelSend(campaignId);

    // Success message
    const successMessage = `Campaign ${campaignId} has been successfully cancelled. Note that some recipients may have already received the campaign.`;
    log(successMessage);

    // Set the output variable
    setOutput(outputVariable, successMessage);
  } catch (error) {
    // Handle specific error cases
    if (error.response && error.response.status === 404) {
      throw new Error(
        `Campaign with ID ${campaignId} not found. Please check the ID and try again.`,
      );
    } else if (error.response && error.response.status === 403) {
      throw new Error(
        'This feature requires a Mailchimp Pro account. Please upgrade your account or contact Mailchimp support.',
      );
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.detail
    ) {
      throw new Error(`Mailchimp API Error: ${error.response.data.detail}`);
    } else {
      // Generic error handling
      throw new Error(
        `Failed to cancel campaign: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
