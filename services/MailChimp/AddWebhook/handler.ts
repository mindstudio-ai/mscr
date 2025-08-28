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
  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate environment variables
  if (!apiKey) {
    throw new Error(
      'Missing Mailchimp API Key. Please add it in the service configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please add it in the service configuration.',
    );
  }

  // Extract inputs
  const {
    listId,
    url,
    subscribeEvent,
    unsubscribeEvent,
    profileEvent,
    cleanedEvent,
    upemailEvent,
    campaignEvent,
    userSource,
    adminSource,
    apiSource,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!url) {
    throw new Error('Webhook URL is required');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Convert string boolean values to actual booleans
  const convertToBoolean = (value: string): boolean => value === 'true';

  // Prepare webhook data
  const webhookData = {
    url,
    events: {
      subscribe: convertToBoolean(subscribeEvent),
      unsubscribe: convertToBoolean(unsubscribeEvent),
      profile: convertToBoolean(profileEvent),
      cleaned: convertToBoolean(cleanedEvent),
      upemail: convertToBoolean(upemailEvent),
      campaign: convertToBoolean(campaignEvent),
    },
    sources: {
      user: convertToBoolean(userSource),
      admin: convertToBoolean(adminSource),
      api: convertToBoolean(apiSource),
    },
  };

  log(`Creating webhook for list ${listId} at URL: ${url}`);

  try {
    // Create the webhook
    const response = await mailchimp.lists.createListWebhook(
      listId,
      webhookData,
    );

    log('Webhook created successfully');

    // Set the output variable with the webhook creation result
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Failed to create webhook: ${error.message || error}`);
    }
  }
};
