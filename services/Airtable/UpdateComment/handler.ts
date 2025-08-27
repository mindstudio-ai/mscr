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
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing Airtable authentication token');
  }

  const {
    baseId,
    tableIdOrName,
    recordId,
    commentId,
    commentText,
    outputVariable,
  } = inputs;

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
  if (!commentText) {
    throw new Error('Comment text is required');
  }

  // Construct the API URL
  const url = `https://api.airtable.com/v0/${baseId}/${tableIdOrName}/${recordId}/comments/${commentId}`;

  log(`Updating comment on record ${recordId}...`);

  try {
    // Make the API request to update the comment
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: commentText,
      }),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update comment: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse the response
    const updatedComment = await response.json();

    log(`Comment updated successfully`);

    // Set the output variable with the updated comment data
    setOutput(outputVariable, updatedComment);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while updating the comment');
  }
};
