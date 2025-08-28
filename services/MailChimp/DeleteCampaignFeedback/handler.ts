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
  // Extract inputs
  const { campaignId, feedbackId } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  if (!feedbackId) {
    throw new Error('Feedback ID is required');
  }

  // Get environment variables
  const { apiKey, serverPrefix } = process.env;

  if (!apiKey) {
    throw new Error(
      'MailChimp API Key is missing. Please check your configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'MailChimp Server Prefix is missing. Please check your configuration.',
    );
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    log(`Deleting feedback ID ${feedbackId} from campaign ${campaignId}...`);

    // Delete the feedback message
    await mailchimp.campaigns.deleteFeedbackMessage(campaignId, feedbackId);

    log('Feedback message deleted successfully');
  } catch (error) {
    // Handle API errors
    if (error.response) {
      const { status, detail } = error.response.body || {};
      throw new Error(
        `MailChimp API Error (${status}): ${detail || error.message}`,
      );
    }

    // Handle other errors
    throw error;
  }
};
