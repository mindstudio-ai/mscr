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
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your Blotato API key in the service settings.',
    );
  }

  const { videoId, outputVariable } = inputs;
  if (!videoId) {
    throw new Error('Missing Video ID. Please provide a video ID to delete.');
  }

  log(`Preparing to delete video with ID: ${videoId}`);

  try {
    // Make the DELETE request to the Blotato API
    const response = await fetch(
      `https://backend.blotato.com/v2/videos/${videoId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Check if the request was successful
    if (response.status === 204) {
      log(`Video with ID ${videoId} was successfully deleted.`);

      // Set the output with the result
      setOutput(outputVariable, {
        success: true,
        id: videoId,
        message: 'Video successfully deleted',
      });
    } else {
      // Handle error responses
      let errorData: any;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: 'Unknown error occurred' };
      }

      log(
        `Failed to delete video. Server returned status code: ${response.status}`,
      );

      setOutput(outputVariable, {
        success: false,
        id: videoId,
        statusCode: response.status,
        message: errorData.message || 'Failed to delete video',
      });
    }
  } catch (error) {
    // Handle network errors or other exceptions
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error deleting video: ${errorMessage}`);

    setOutput(outputVariable, {
      success: false,
      id: videoId,
      message: `Error: ${errorMessage}`,
    });
  }
};
