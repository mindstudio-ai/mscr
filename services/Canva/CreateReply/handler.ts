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
  // Extract inputs
  const { designId, threadId, message, outputVariable } = inputs;

  // Get the bearer token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Canva integration settings.',
    );
  }

  // Validate required inputs
  if (!designId) {
    throw new Error('Design ID is required');
  }

  if (!threadId) {
    throw new Error('Thread ID is required');
  }

  if (!message) {
    throw new Error('Reply message is required');
  }

  if (message.length > 2048) {
    throw new Error('Reply message exceeds maximum length of 2048 characters');
  }

  // Prepare request URL and body
  const url = `https://api.canva.com/rest/v1/designs/${designId}/comments/${threadId}/replies`;
  const body = JSON.stringify({
    message_plaintext: message,
  });

  log(`Creating reply to thread ${threadId} in design ${designId}...`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body,
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Canva integration settings.',
        );
      } else if (response.status === 404) {
        throw new Error(
          'Design or thread not found. Please check your Design ID and Thread ID.',
        );
      } else if (response.status === 429) {
        throw new Error(
          'Rate limit exceeded. Canva allows 20 requests per minute per user.',
        );
      } else {
        throw new Error(
          `Failed to create reply: ${response.status} ${errorText}`,
        );
      }
    }

    // Parse the response
    const data = (await response.json()) as any;

    log('Reply created successfully!');

    // Set the output variable with the full response
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    } else {
      const errorMessage = 'An unknown error occurred';
      log(`Error: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  }
};
