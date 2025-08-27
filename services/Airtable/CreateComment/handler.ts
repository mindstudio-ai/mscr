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
  const {
    baseId,
    tableIdOrName,
    recordId,
    commentText,
    parentCommentId,
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

  if (!commentText) {
    throw new Error('Comment text is required');
  }

  // Validate environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error('Airtable authentication token is missing');
  }

  // Prepare request body
  const requestBody: Record<string, any> = {
    text: commentText,
  };

  // Add optional parent comment ID if provided
  if (parentCommentId) {
    requestBody.parentCommentId = parentCommentId;
    log(`Creating a reply to comment ${parentCommentId}`);
  } else {
    log('Creating a new comment');
  }

  try {
    // Construct API URL
    const apiUrl = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}/${encodeURIComponent(recordId)}/comments`;

    log(
      `Sending comment to Airtable: "${commentText.substring(0, 30)}${commentText.length > 30 ? '...' : ''}"`,
    );

    // Make API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Airtable API error (${response.status})`;

      try {
        // Try to parse error as JSON for more details
        const errorJson = JSON.parse(errorText);
        if (errorJson.error) {
          errorMessage = `Airtable API error: ${errorJson.error.message || errorJson.error}`;
        }
      } catch (e) {
        // If error isn't valid JSON, use the raw text
        errorMessage = `Airtable API error: ${errorText}`;
      }

      throw new Error(errorMessage);
    }

    const commentData = await response.json();

    log(`Comment created successfully with ID: ${commentData.id}`);

    // Set output variable with the comment data
    setOutput(outputVariable, commentData);
  } catch (error) {
    // Handle and rethrow errors
    if (error instanceof Error) {
      log(`Error creating comment: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while creating comment');
  }
};
