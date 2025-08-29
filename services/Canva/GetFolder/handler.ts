export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract inputs
  const { folderId, outputVariable } = inputs;

  // Validate required environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Canva connection settings.',
    );
  }

  // Validate required inputs
  if (!folderId) {
    throw new Error('Folder ID is required');
  }

  // Prepare API request
  const url = `https://api.canva.com/rest/v1/folders/${folderId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  log(`Retrieving folder information for folder ID: ${folderId}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    // Handle error responses
    if (!response.ok) {
      const errorText = await response.text();
      log(`Error retrieving folder: ${response.status} ${response.statusText}`);
      throw new Error(
        `Failed to retrieve folder: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const data = (await response.json()) as any;

    log(
      `Successfully retrieved folder: "${data.folder?.name || 'Unnamed folder'}"`,
    );

    // Set the output variable with the folder information
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving the folder information',
    );
  }
};
