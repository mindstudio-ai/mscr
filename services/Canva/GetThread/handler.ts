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
      'Missing authentication token. Please check your Canva API credentials.',
    );
  }

  const { designId, threadId, outputVariable } = inputs;

  if (!designId) {
    throw new Error('Design ID is required');
  }

  if (!threadId) {
    throw new Error('Thread ID is required');
  }

  log(`Retrieving comment thread ${threadId} from design ${designId}`);

  try {
    const response = await fetch(
      `https://api.canva.com/rest/v1/designs/${designId}/comments/${threadId}`,
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
        `Failed to retrieve thread: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const threadData = (await response.json()) as any;
    log('Successfully retrieved thread information');

    setOutput(outputVariable, threadData);
  } catch (error) {
    if (error instanceof Error) {
      // Handle specific error cases
      if (error.message.includes('401')) {
        throw new Error(
          'Authentication failed. Please check your Canva API token.',
        );
      } else if (error.message.includes('403')) {
        throw new Error(
          'You do not have permission to access this thread. Please check your API token scopes.',
        );
      } else if (error.message.includes('404')) {
        throw new Error(
          'Thread or design not found. Please verify the Design ID and Thread ID are correct.',
        );
      } else {
        throw error;
      }
    } else {
      throw new Error(`An unexpected error occurred: ${String(error)}`);
    }
  }
};
