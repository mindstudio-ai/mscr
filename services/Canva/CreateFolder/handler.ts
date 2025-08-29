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
  const { folderName, parentFolderId, outputVariable } = inputs;

  // Validate token
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Canva connection settings.',
    );
  }

  // Log the operation
  log(
    `Creating folder "${folderName}" in Canva${
      parentFolderId === 'root'
        ? ' at the root level'
        : parentFolderId === 'uploads'
          ? ' in the Uploads folder'
          : ` inside folder with ID: ${parentFolderId}`
    }`,
  );

  try {
    // Make the API request to create the folder
    const response = await fetch('https://api.canva.com/rest/v1/folders', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: folderName,
        parent_folder_id: parentFolderId,
      }),
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();

      // Handle specific error codes
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          'Authentication failed. Please check your Canva connection and ensure you have the folder:write permission.',
        );
      } else if (response.status === 429) {
        throw new Error(
          'Rate limit exceeded. Canva allows 20 requests per minute per user.',
        );
      } else {
        throw new Error(
          `Failed to create folder: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }
    }

    // Parse the response
    const data = (await response.json()) as any;

    log(
      `Successfully created folder "${folderName}" with ID: ${data.folder.id}`,
    );

    // Set the output
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unexpected error occurred while creating the folder');
  }
};
