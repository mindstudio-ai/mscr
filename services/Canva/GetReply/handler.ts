export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing Canva API token. Please check your authentication settings.',
    );
  }

  const { designId, threadId, replyId, outputVariable } = inputs;

  // Validate required inputs
  if (!designId) {
    throw new Error('Design ID is required');
  }
  if (!threadId) {
    throw new Error('Thread ID is required');
  }
  if (!replyId) {
    throw new Error('Reply ID is required');
  }

  log(
    `Retrieving reply ${replyId} from thread ${threadId} in design ${designId}...`,
  );

  try {
    const response = await fetch(
      `https://api.canva.com/rest/v1/designs/${designId}/comments/${threadId}/replies/${replyId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to retrieve reply: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const data = (await response.json()) as any;
    log('Successfully retrieved reply data');

    // Set the output variable with the full response
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error: ${errorMessage}`);
    throw error;
  }
};
