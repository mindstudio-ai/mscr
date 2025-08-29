export const handler = async ({
  inputs,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Extract the asset ID from inputs
  const { assetId } = inputs;

  // Validate required inputs
  if (!assetId) {
    throw new Error('Asset ID is required');
  }

  // Get the authentication token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  // Log the operation being performed
  log(`Deleting asset with ID: ${assetId}`);

  try {
    // Make the DELETE request to Canva API
    const response = await fetch(
      `https://api.canva.com/rest/v1/assets/${assetId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // Handle different response status codes
    if (response.status === 204) {
      log(`Asset successfully deleted and moved to trash`);
      return;
    } else if (response.status === 401) {
      throw new Error('Authentication failed. Please check your credentials.');
    } else if (response.status === 403) {
      throw new Error(
        "You don't have permission to delete this asset. Make sure your token has the 'asset:write' scope.",
      );
    } else if (response.status === 404) {
      throw new Error('Asset not found. Please check the asset ID.');
    } else if (response.status === 429) {
      throw new Error(
        'Rate limit exceeded. Please try again later (limit: 30 requests per minute).',
      );
    } else {
      // For other error cases, try to get more details from the response
      let errorDetails = '';
      try {
        const errorData = await response.json();
        errorDetails = JSON.stringify(errorData);
      } catch (e) {
        // If we can't parse the response as JSON, use the status text
        errorDetails = response.statusText;
      }

      throw new Error(
        `Failed to delete asset: ${response.status} - ${errorDetails}`,
      );
    }
  } catch (error) {
    // Handle network errors or errors thrown above
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(`An unexpected error occurred: ${String(error)}`);
  }
};
