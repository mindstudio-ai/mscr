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
  const { designId, threadId, outputVariable } = inputs;

  // Get the token from environment variables
  const { token } = process.env;

  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your connection settings.',
    );
  }

  log(`Retrieving comment thread ${threadId} from design ${designId}...`);

  try {
    // Make the API request to Canva
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

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to retrieve thread: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const threadData = (await response.json()) as any;

    log(`Successfully retrieved thread information.`);

    // Set the output variable with the thread data
    setOutput(outputVariable, threadData);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving the thread.');
  }
};
