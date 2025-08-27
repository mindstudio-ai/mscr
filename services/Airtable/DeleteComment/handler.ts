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
  const { baseId, tableIdOrName, recordId, commentId, outputVariable } = inputs;

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }
  if (!tableIdOrName) {
    throw new Error('Table ID or Name is required');
  }
  if (!recordId) {
    throw new Error('Record ID is required');
  }
  if (!commentId) {
    throw new Error('Comment ID is required');
  }

  // Get token from environment variables
  const token = process.env.token;
  if (!token) {
    throw new Error(
      'Airtable token is missing. Please check your connection settings.',
    );
  }

  // Construct the API URL
  const url = `https://api.airtable.com/v0/${baseId}/${tableIdOrName}/${recordId}/comments/${commentId}`;

  log(`Deleting comment ${commentId} from record ${recordId}`);

  try {
    // Make the DELETE request to Airtable API
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error?.message || `HTTP error ${response.status}`;
      throw new Error(`Failed to delete comment: ${errorMessage}`);
    }

    // Parse the response
    const result = await response.json();

    // Log success message
    if (result.deleted) {
      log(`Successfully deleted comment ${commentId}`);
    } else {
      log(`Comment deletion response received but status unclear`);
    }

    // Set the output variable with the deletion result
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle any errors that occur during the request
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error: ${errorMessage}`);
    throw error;
  }
};
