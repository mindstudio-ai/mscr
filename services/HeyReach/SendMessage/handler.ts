export const handler = async ({
  inputs,
  setOutput,
  log,
  uploadFile,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API Key in the connector settings.',
    );
  }

  // Extract inputs
  const {
    message,
    subject,
    conversationId,
    linkedInAccountId,
    successVariable,
  } = inputs;

  // Validate required inputs
  if (!message) {
    throw new Error('Message content is required');
  }
  if (!conversationId) {
    throw new Error('Conversation ID is required');
  }
  if (!linkedInAccountId) {
    throw new Error('LinkedIn Account ID is required');
  }

  // Prepare request payload
  const payload = {
    message,
    subject: subject || undefined, // Only include if provided
    conversationId,
    linkedInAccountId: Number(linkedInAccountId), // Ensure it's a number
  };

  log(
    `Sending message to LinkedIn conversation ${conversationId} from account ${linkedInAccountId}`,
  );

  try {
    // Make request to HeyReach API
    const response = await fetch(
      'https://api.heyreach.io/api/public/inbox/SendMessage',
      {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          Accept: 'text/plain',
        },
        body: JSON.stringify(payload),
      },
    );

    // Handle response
    if (!response.ok) {
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(
          errorData.errorMessage ||
            `Error sending message: ${response.status} ${response.statusText}`,
        );
      } else {
        throw new Error(
          `Error sending message: ${response.status} ${response.statusText}`,
        );
      }
    }

    log('Message sent successfully');
    setOutput(successVariable, true);
  } catch (error) {
    log(
      `Failed to send message: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
