export const handler = async ({
  inputs,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { accessToken } = process.env;
  if (!accessToken) {
    throw new Error('Missing Spotify access token. Please check your connection settings.');
  }

  const { albumIds } = inputs;
  if (!albumIds) {
    throw new Error('Album IDs are required. Please provide at least one Spotify album ID.');
  }

  // Parse and validate album IDs
  const albumIdArray = albumIds.split(',').map(id => id.trim()).filter(Boolean);
  
  if (albumIdArray.length === 0) {
    throw new Error('No valid album IDs provided.');
  }
  
  if (albumIdArray.length > 20) {
    throw new Error('Too many album IDs provided. Maximum allowed is 20.');
  }

  log(`Removing ${albumIdArray.length} album(s) from your Spotify library...`);

  try {
    const response = await fetch(`https://api.spotify.com/v1/me/albums?ids=${encodeURIComponent(albumIds)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 401) {
        throw new Error('Spotify authentication failed. Your access token may have expired.');
      } else if (response.status === 403) {
        throw new Error('You do not have permission to remove these albums. Check your Spotify account permissions.');
      } else if (response.status === 429) {
        throw new Error('Too many requests to Spotify. Please try again later.');
      }

      // Handle generic error with status code
      const errorText = await response.text();
      throw new Error(`Spotify API error (${response.status}): ${errorText}`);
    }

    // Success - 200 response with empty body is expected
    log(`Successfully removed ${albumIdArray.length} album(s) from your Spotify library.`);
  } catch (error) {
    // Handle fetch or other errors
    if (error instanceof Error) {
      throw new Error(`Failed to remove albums: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while removing albums from your Spotify library.');
    }
  }
};