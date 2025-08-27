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

  // Extract inputs
  const {
    conversationId,
    isRead,
    sinceTimestamp,
    beforeTimestamp,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!conversationId) {
    throw new Error('Conversation ID is required.');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Build query parameters
  const params: Record<string, string> = {};

  if (isRead) {
    params.is_read = isRead;
  }

  if (sinceTimestamp) {
    params.since_timestamp = sinceTimestamp;
  }

  if (beforeTimestamp) {
    params.before_timestamp = beforeTimestamp;
  }

  try {
    log(`Retrieving messages for conversation: ${conversationId}`);

    // Make API request to get conversation messages
    const response = await mailchimp.conversations.getConversationMessages(
      conversationId,
      params,
    );

    log(
      `Successfully retrieved ${response.conversation_messages.length} messages`,
    );

    // Set output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      // Check for specific error types
      if (error.message.includes('404')) {
        throw new Error(
          `Conversation with ID "${conversationId}" not found. Please check the ID and try again.`,
        );
      } else if (error.message.includes('401')) {
        throw new Error(
          'Authentication failed. Please check your API Key and Server Prefix.',
        );
      } else {
        throw new Error(
          `Failed to retrieve conversation messages: ${error.message}`,
        );
      }
    } else {
      throw new Error(
        'An unknown error occurred while retrieving conversation messages.',
      );
    }
  }
};
