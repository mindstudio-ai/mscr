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
  const { itemId, toFolderId, outputVariable } = inputs;

  // Get the bearer token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Canva connection settings.',
    );
  }

  // Log the operation being performed
  log(`Moving item ${itemId} to folder ${toFolderId}`);

  try {
    // Make the API request to move the folder item
    const response = await fetch('https://api.canva.com/rest/v1/folders/move', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // API expects snake_case parameter names
        to_folder_id: toFolderId,
        item_id: itemId,
      }),
    });

    // Handle different response statuses
    if (response.status === 204) {
      // Success - API returns 204 No Content
      log('Item moved successfully');
      setOutput(outputVariable, {
        success: true,
        message: 'Item moved successfully',
      });
    } else {
      // Parse error response
      const errorData = await response.json();

      // Special handling for the item_in_multiple_folders error
      if (errorData.error?.code === 'item_in_multiple_folders') {
        const errorMessage =
          'This item exists in multiple folders. Please use the Canva UI to move this item.';
        log(errorMessage);
        setOutput(outputVariable, {
          success: false,
          error: errorMessage,
        });
      } else {
        // Handle other errors
        const errorMessage =
          errorData.error?.message ||
          `Error: ${response.status} ${response.statusText}`;
        log(`Failed to move item: ${errorMessage}`);
        setOutput(outputVariable, {
          success: false,
          error: errorMessage,
        });
      }
    }
  } catch (error) {
    // Handle network or other unexpected errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error moving item: ${errorMessage}`);
    setOutput(outputVariable, {
      success: false,
      error: errorMessage,
    });
  }
};
