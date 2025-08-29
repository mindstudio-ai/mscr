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
  // Extract inputs and environment variables
  const { designId, outputVariable } = inputs;
  const { token } = process.env;

  // Validate required inputs and environment variables
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Canva connection settings.',
    );
  }

  if (!designId) {
    throw new Error(
      'Design ID is required. Please provide a valid Canva design ID.',
    );
  }

  log(`Retrieving information for Canva design: ${designId}`);

  try {
    // Make the API request to Canva
    const response = await fetch(
      `https://api.canva.com/rest/v1/designs/${designId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to retrieve design: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const data = (await response.json()) as any;

    log('Successfully retrieved design information');

    // Set the output variable with the design data
    setOutput(outputVariable, data.design);
  } catch (error) {
    // Handle any errors that occurred during the request
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
