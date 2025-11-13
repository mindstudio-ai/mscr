export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing Blotato API Key. Please check your connection settings.',
    );
  }

  // Extract inputs
  const { videoId, outputVariable } = inputs;

  if (!videoId) {
    throw new Error('Missing Video ID. Please provide a valid video ID.');
  }

  // Base URL for Blotato API
  const baseUrl = 'https://backend.blotato.com/v2';

  try {
    log(`Retrieving status for video ID: ${videoId}`);

    // Make the API request
    const response = await fetch(`${baseUrl}/videos/creations/${videoId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(`Video not found with ID: ${videoId}`);
      } else {
        throw new Error(
          `Failed to retrieve video: ${response.status} ${response.statusText}`,
        );
      }
    }

    // Parse the response
    const data = (await response.json()) as any;

    if (!data.item) {
      throw new Error('Unexpected response format from Blotato API');
    }

    const videoDetails = data.item;

    // Log the current status of the video
    log(`Video found. Current status: ${videoDetails.status}`);

    if (videoDetails.mediaUrl) {
      log(`Video is ready and available at: ${videoDetails.mediaUrl}`);
    } else {
      log('Video is still being processed and is not ready for viewing yet');
    }

    // Set the output variable with the video details
    setOutput(outputVariable, videoDetails);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving the video');
  }
};
