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
  const { listId, outputVariable } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate environment variables
  if (!apiKey) {
    throw new Error('MailChimp API Key is not configured');
  }

  if (!serverPrefix) {
    throw new Error('MailChimp Server Prefix is not configured');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    // Log the action being performed
    log(`Retrieving webhooks for MailChimp list: ${listId}`);

    // Make the API call to get list webhooks
    const response = await mailchimp.lists.getListWebhooks(listId);

    // Log success message with the count of webhooks found
    log(
      `Successfully retrieved ${response.webhooks.length} webhooks for list ${listId}`,
    );

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response) {
      // If the error has a response property, it's likely an API error
      const { status, detail } = error.response.body || {};
      throw new Error(
        `MailChimp API Error (${status}): ${detail || error.message}`,
      );
    } else {
      // For other errors, just throw the original error
      throw error;
    }
  }
};
