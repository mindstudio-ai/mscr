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
  const { listId, webhookId, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing Mailchimp API Key. Please configure it in the service settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please configure it in the service settings.',
    );
  }

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    // Log the operation
    log(`Retrieving webhook ${webhookId} from list ${listId}...`);

    // Make the API call to get webhook information
    const response = await mailchimp.lists.getListWebhook(listId, webhookId);

    // Log success
    log(`Successfully retrieved webhook information`);

    // Set the output variable with the webhook information
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`Mailchimp API Error: ${errorDetail}`);
    } else {
      throw new Error(`Error retrieving webhook: ${error.message || error}`);
    }
  }
};
