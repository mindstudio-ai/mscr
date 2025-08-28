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
  const { listId, webhookId } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your MailChimp API Key in the service connection.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the service connection.',
    );
  }

  // Initialize the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    log(`Attempting to delete webhook ${webhookId} from list ${listId}...`);

    // Delete the webhook
    await mailchimp.lists.deleteListWebhook(listId, webhookId);

    log(`Successfully deleted webhook ${webhookId} from list ${listId}.`);
  } catch (error) {
    // Handle specific error cases with user-friendly messages
    if (error.response && error.response.status === 404) {
      throw new Error(
        `Webhook not found. Please verify that both the List ID (${listId}) and Webhook ID (${webhookId}) are correct.`,
      );
    } else if (error.response && error.response.status === 401) {
      throw new Error(
        'Authentication failed. Please check your MailChimp API Key and Server Prefix.',
      );
    } else {
      // Log the detailed error for debugging
      console.error('MailChimp API Error:', error);

      // Provide a user-friendly error message
      throw new Error(
        `Failed to delete webhook: ${error.message || 'Unknown error occurred'}`,
      );
    }
  }
};
