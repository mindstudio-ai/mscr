export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API Key in the connector settings.',
    );
  }

  const { accountId, conversationId, outputVariable } = inputs;

  if (!accountId) {
    throw new Error('Account ID is required');
  }

  if (!conversationId) {
    throw new Error('Conversation ID is required');
  }

  log(
    `Retrieving LinkedIn conversation ${conversationId} from account ${accountId}...`,
  );

  try {
    const response = await fetch(
      `https://api.heyreach.io/api/public/inbox/GetChatroom/${accountId}/${conversationId}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': apiKey,
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      const statusCode = response.status;

      if (statusCode === 401) {
        throw new Error('Unauthorized: Invalid API key');
      } else if (statusCode === 403) {
        throw new Error(
          'Forbidden: You do not have permission to access this resource',
        );
      } else if (statusCode === 404) {
        throw new Error(
          'Conversation not found. Please check the Account ID and Conversation ID',
        );
      } else if (statusCode === 429) {
        throw new Error('Too many requests. Please try again later');
      } else {
        throw new Error(`Request failed with status code ${statusCode}`);
      }
    }

    const data = await response.json();
    log('Successfully retrieved conversation data');

    // Set the output variable with the conversation data
    setOutput(outputVariable, data);

    // Log some basic information about the conversation
    if (data.correspondentProfile) {
      const correspondent = data.correspondentProfile;
      log(
        `Conversation with ${correspondent.firstName} ${correspondent.lastName || ''} (${data.totalMessages} messages)`,
      );
    } else {
      log(`Retrieved conversation with ${data.totalMessages || 0} messages`);
    }
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};
