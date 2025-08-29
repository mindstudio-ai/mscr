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
  const { folderId, folderName, outputVariable } = inputs;

  // Validate required environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Canva connection settings.',
    );
  }

  // Validate inputs
  if (!folderId) {
    throw new Error('Folder ID is required');
  }

  if (!folderName) {
    throw new Error('Folder name is required');
  }

  if (folderName.length < 1 || folderName.length > 255) {
    throw new Error('Folder name must be between 1 and 255 characters');
  }

  log(`Updating folder "${folderId}" with new name: "${folderName}"`);

  // Prepare request
  const url = `https://api.canva.com/rest/v1/folders/${folderId}`;
  const requestBody = {
    name: folderName,
  };

  try {
    // Make API request
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();

      // Handle common error cases
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Canva connection settings.',
        );
      } else if (response.status === 403) {
        throw new Error(
          "You don't have permission to update this folder. Make sure your token has the 'folder:write' scope.",
        );
      } else if (response.status === 404) {
        throw new Error(`Folder with ID "${folderId}" not found.`);
      } else if (response.status === 429) {
        throw new Error(
          'Rate limit exceeded. Please try again later (limit is 20 requests per minute).',
        );
      } else {
        throw new Error(
          `Failed to update folder: ${response.status} ${errorText}`,
        );
      }
    }

    // Parse response
    const data = (await response.json()) as any;

    log(`Successfully updated folder to "${folderName}"`);

    // Set output
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`An unexpected error occurred: ${String(error)}`);
  }
};
