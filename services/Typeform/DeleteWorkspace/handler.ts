export const handler = async ({
  inputs,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { token } = process.env;
  const { workspaceId } = inputs;

  // Validate required environment variables
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your connection settings.',
    );
  }

  // Validate required inputs
  if (!workspaceId) {
    throw new Error('Workspace ID is required.');
  }

  log(`Preparing to delete workspace with ID: ${workspaceId}`);

  // Set up request options
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    // Make the API request to delete the workspace
    log('Sending delete request to Typeform...');
    const response = await fetch(
      `https://api.typeform.com/workspaces/${workspaceId}`,
      requestOptions,
    );

    // Handle different response statuses
    if (response.status === 204) {
      log(`Success! Workspace ${workspaceId} has been deleted.`);
    } else if (response.status === 401) {
      throw new Error('Authentication failed. Please check your API token.');
    } else if (response.status === 403) {
      throw new Error("You don't have permission to delete this workspace.");
    } else if (response.status === 404) {
      throw new Error(`Workspace with ID ${workspaceId} not found.`);
    } else {
      const errorText = await response.text();
      throw new Error(
        `Failed to delete workspace: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while deleting the workspace.');
  }
};
