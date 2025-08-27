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
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your Beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const { publicationId, segmentId, outputVariable } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }
  if (!segmentId) {
    throw new Error('Segment ID is required');
  }

  // Validate ID formats
  const pubIdRegex = /^pub_[0-9a-fA-F\-]+$/;
  const segIdRegex = /^seg_[0-9a-fA-F\-]+$/;

  if (!pubIdRegex.test(publicationId)) {
    throw new Error(
      'Invalid Publication ID format. It should be in the format pub_XXXX-XXXX-XXXX-XXXX',
    );
  }

  if (!segIdRegex.test(segmentId)) {
    throw new Error(
      'Invalid Segment ID format. It should be in the format seg_XXXX-XXXX-XXXX-XXXX',
    );
  }

  // Construct API URL
  const url = `https://api.beehiiv.com/v2/publications/${publicationId}/segments/${segmentId}/recalculate`;

  log(`Recalculating segment ${segmentId} for publication ${publicationId}...`);

  try {
    // Make API request
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to recalculate segment: ${response.status} ${response.statusText}`;

      try {
        // Try to parse error response as JSON
        const errorData = JSON.parse(errorText);
        if (errorData.message) {
          errorMessage += ` - ${errorData.message}`;
        }
      } catch (e) {
        // If parsing fails, use the raw text
        if (errorText) {
          errorMessage += ` - ${errorText}`;
        }
      }

      // Handle specific error codes
      if (response.status === 404) {
        throw new Error(
          `Resource not found. Please verify your Publication ID and Segment ID are correct.`,
        );
      } else if (response.status === 422) {
        throw new Error(`Invalid request data: ${errorMessage}`);
      } else if (response.status === 429) {
        throw new Error(`Rate limit exceeded. Please try again later.`);
      } else if (response.status >= 500) {
        throw new Error(`Beehiiv server error. Please try again later.`);
      } else {
        throw new Error(errorMessage);
      }
    }

    // Process successful response
    const data = await response.json();

    log('Segment recalculation initiated successfully');

    // Set output
    setOutput(outputVariable, {
      success: true,
      message: data.message || 'Segment recalculation initiated successfully',
      status: response.status,
    });
  } catch (error) {
    // Handle network errors or other exceptions
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unexpected error occurred while recalculating the segment',
    );
  }
};
