export const handler = async ({
  inputs,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Extract the token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Canva connection settings.',
    );
  }

  // Extract folder ID from inputs
  const { folderId } = inputs;
  if (!folderId) {
    throw new Error('Folder ID is required');
  }

  log(`Preparing to delete folder with ID: ${folderId}`);

  try {
    // Make the DELETE request to Canva API
    const response = await fetch(
      `https://api.canva.com/rest/v1/folders/${folderId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // Handle response based on status code
    if (response.status === 204) {
      log(`Successfully deleted folder with ID: ${folderId}`);
    } else if (response.status === 401 || response.status === 403) {
      throw new Error(
        "Authentication failed. Please check your Canva connection and ensure you have the 'folder:write' permission.",
      );
    } else if (response.status === 404) {
      throw new Error(`Folder with ID ${folderId} not found.`);
    } else if (response.status === 429) {
      throw new Error(
        'Rate limit exceeded. Canva allows 20 requests per minute per user.',
      );
    } else {
      // Try to get error details from response
      let errorDetails = '';
      try {
        const errorData = await response.json();
        errorDetails = JSON.stringify(errorData);
      } catch (e) {
        // If response doesn't contain JSON, use status text
        errorDetails = response.statusText;
      }

      throw new Error(
        `Failed to delete folder: ${response.status} ${errorDetails}`,
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(`An unexpected error occurred: ${String(error)}`);
  }
};
