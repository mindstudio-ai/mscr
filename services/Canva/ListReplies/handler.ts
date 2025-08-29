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
  const { designId, threadId, limit, continuation, outputVariable } = inputs;

  // Validate required environment variables
  const token = process.env.token;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Canva API credentials.',
    );
  }

  // Validate required inputs
  if (!designId) {
    throw new Error('Design ID is required');
  }

  if (!threadId) {
    throw new Error('Thread ID is required');
  }

  // Build URL with query parameters
  let url = `https://api.canva.com/rest/v1/designs/${designId}/comments/${threadId}/replies`;

  // Add query parameters if provided
  const queryParams = new URLSearchParams();

  if (limit) {
    queryParams.append('limit', limit);
  }

  if (continuation) {
    queryParams.append('continuation', continuation);
  }

  // Append query parameters to URL if any exist
  const queryString = queryParams.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  log(`Fetching replies for thread ${threadId} in design ${designId}...`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Canva API token.',
        );
      } else if (response.status === 403) {
        throw new Error(
          "You don't have permission to access this resource. Make sure your token has the 'comment:read' scope.",
        );
      } else if (response.status === 404) {
        throw new Error(
          `Resource not found. Please verify the design ID (${designId}) and thread ID (${threadId}) are correct.`,
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Canva API error (${response.status}): ${errorText}`);
      }
    }

    // Parse the response
    const data = (await response.json()) as any;

    // Log the result
    const replyCount = data.items?.length || 0;
    log(`Successfully retrieved ${replyCount} replies`);

    if (data.continuation) {
      log(
        'More replies are available. Use the continuation token to fetch the next page.',
      );
    }

    // Set the output
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching replies');
  }
};
