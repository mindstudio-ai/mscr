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
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing Canva API token. Please check your connection settings.',
    );
  }

  const { designId, outputVariable } = inputs;
  if (!designId) {
    throw new Error('Design ID is required');
  }

  log(`Retrieving available export formats for design: ${designId}`);

  try {
    // Make request to Canva API
    const response = await fetch(
      `https://api.canva.com/rest/v1/designs/${designId}/export-formats`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Canva API token.',
        );
      } else if (response.status === 404) {
        throw new Error(
          `Design with ID ${designId} not found. Please check the design ID.`,
        );
      } else if (response.status === 429) {
        throw new Error(
          'Rate limit exceeded. The API is limited to 100 requests per minute per user.',
        );
      } else {
        throw new Error(
          `Canva API error: ${response.status} ${response.statusText}`,
        );
      }
    }

    const data = (await response.json()) as any;
    log('Successfully retrieved export formats');

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving export formats',
    );
  }
};
