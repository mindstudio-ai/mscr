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
  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  if (!apiKey) {
    throw new Error('Missing API Key');
  }

  if (!serverPrefix) {
    throw new Error('Missing Server Prefix');
  }

  // Extract input parameters
  const {
    hasUnreadMessages,
    listId,
    campaignId,
    count,
    offset,
    outputVariable,
  } = inputs;

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log('Fetching conversations from MailChimp...');

  // Build query parameters
  const params: Record<string, any> = {};

  if (hasUnreadMessages !== undefined && hasUnreadMessages !== '') {
    params.has_unread_messages = hasUnreadMessages;
  }

  if (listId) {
    params.list_id = listId;
  }

  if (campaignId) {
    params.campaign_id = campaignId;
  }

  // Add pagination parameters
  if (count) {
    params.count = parseInt(count, 10);
  }

  if (offset) {
    params.offset = parseInt(offset, 10);
  }

  try {
    // Make the API call to list conversations
    const response = await mailchimp.conversations.list(params);

    log(
      `Successfully retrieved ${response.conversations.length} conversations`,
    );

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`MailChimp API Error: ${error.response.body.detail}`);
    } else {
      throw error;
    }
  }
};
