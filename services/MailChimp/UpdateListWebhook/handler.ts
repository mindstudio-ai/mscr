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
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your Mailchimp API Key in the service settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your Mailchimp Server Prefix in the service settings.',
    );
  }

  // Extract inputs
  const {
    listId,
    webhookId,
    url,
    subscribeEvent = 'true',
    unsubscribeEvent = 'true',
    profileEvent = 'true',
    cleanedEvent = 'true',
    upemailEvent = 'true',
    campaignEvent = 'true',
    userSource = 'true',
    adminSource = 'true',
    apiSource = 'true',
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  if (!url) {
    throw new Error('Webhook URL is required');
  }

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Convert string boolean values to actual booleans
  const convertToBoolean = (value: string): boolean => value === 'true';

  // Prepare the webhook update data
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

  log(`Updating webhook ${webhookId} for list ${listId}...`);

  try {
    // Update the webhook
    const response = await mailchimp.lists.updateListWebhook(
      listId,
      webhookId,
      webhookData,
    );

    log(`Webhook updated successfully!`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`Mailchimp API Error: ${error.response.body.detail}`);
    } else {
      throw new Error(`Error updating webhook: ${error.message || error}`);
    }
  }
};
