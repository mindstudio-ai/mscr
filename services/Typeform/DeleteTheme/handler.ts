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
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your connection settings.',
    );
  }

  const { themeId, confirmDeletion } = inputs;

  if (!themeId) {
    throw new Error('Theme ID is required. Please provide a valid Theme ID.');
  }

  // Check confirmation before proceeding with deletion
  if (confirmDeletion !== 'yes') {
    throw new Error('Operation cancelled. Theme was not deleted.');
  }

  log(`Preparing to delete theme with ID: ${themeId}`);

  try {
    // Make the API request to delete the theme
    const response = await fetch(`https://api.typeform.com/themes/${themeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      // If we get a response with error details, try to extract them
      if (response.status !== 204) {
        try {
          const errorData = await response.json();
          throw new Error(
            `Failed to delete theme: ${errorData.message || response.statusText}`,
          );
        } catch (e) {
          throw new Error(
            `Failed to delete theme: ${response.statusText} (${response.status})`,
          );
        }
      }
    }

    log('Theme was successfully deleted.');
  } catch (error) {
    // Handle any network or other errors
    if (error instanceof Error) {
      throw new Error(`Error deleting theme: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while deleting the theme.');
    }
  }
};
