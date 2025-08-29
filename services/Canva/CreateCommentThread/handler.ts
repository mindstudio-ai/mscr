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
    throw new Error(
      'Missing authentication token. Please check your Canva connection settings.',
    );
  }

  const { designId, messagePlaintext, assigneeId, outputVariable } = inputs;

  if (!designId) {
    throw new Error('Design ID is required');
  }

  if (!messagePlaintext) {
    throw new Error('Comment message is required');
  }

  // Prepare request body
  const requestBody: Record<string, any> = {
    message_plaintext: messagePlaintext,
  };

  // Add assignee if provided
  if (assigneeId) {
    requestBody.assignee_id = assigneeId;
    log(`Creating comment thread with assignee: ${assigneeId}`);
  } else {
    log('Creating comment thread');
  }

  try {
    // Make API request to create comment thread
    const response = await fetch(
      `https://api.canva.com/rest/v1/designs/${designId}/comments`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      // Handle specific error codes
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Canva connection settings.',
        );
      } else if (response.status === 403) {
        throw new Error(
          'You do not have permission to add comments to this design.',
        );
      } else if (response.status === 404) {
        throw new Error(`Design with ID ${designId} not found.`);
      } else if (response.status === 429) {
        throw new Error(
          'Rate limit exceeded. Please try again later (limit is 100 requests per minute).',
        );
      } else {
        throw new Error(
          `Failed to create comment thread: ${response.status} ${errorText}`,
        );
      }
    }

    // Parse response
    const responseData = (await response.json()) as any;

    log('Comment thread created successfully');

    // Set output variable with the thread data
    setOutput(outputVariable, responseData);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating comment thread: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while creating the comment thread',
      );
    }
  }
};
