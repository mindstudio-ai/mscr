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

  // Validate environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const { conversationId, messageId, fields, excludeFields, outputVariable } =
    inputs;

  // Validate required inputs
  if (!conversationId) {
    throw new Error('Conversation ID is required');
  }

  if (!messageId) {
    throw new Error('Message ID is required');
  }

  // Set up the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare optional parameters
  const params: Record<string, any> = {};

  if (fields) {
    params.fields = fields;
  }

  if (excludeFields) {
    params.exclude_fields = excludeFields;
  }

  try {
    log(
      `Retrieving message ${messageId} from conversation ${conversationId}...`,
    );

    // Make the API request to get the conversation message
    const response = await mailchimp.conversations.getConversationsIdMessagesId(
      conversationId,
      messageId,
      params,
    );

    log('Message retrieved successfully');

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(
        `Error retrieving conversation message: ${error.message}`,
      );
    }
  }
};
