export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { albumIds, successMessage } = inputs;
 const { clientId, clientSecret } = process.env;

// Get access token using client credentials flow
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials'
    })
  });

  if (!tokenResponse.ok) {
    throw new Error(`Failed to get access token: ${tokenResponse.status} ${tokenResponse.statusText}`);
  }

  const tokenData = await tokenResponse.json() as { access_token: string };
  const accessToken = tokenData.access_token;

   if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify API credentials. Please check your clientId and clientSecret.');
  }

  
  if (!albumIds) {
    throw new Error("Album IDs are required");
  }

  // Validate the number of album IDs
  const albumIdList = albumIds.split(",").map(id => id.trim());
  if (albumIdList.length > 20) {
    throw new Error("Maximum of 20 album IDs allowed");
  }

  log(`Saving ${albumIdList.length} album(s) to your Spotify library...`);

  try {
    // Make the API request to save albums
    const response = await fetch(
      `https://api.spotify.com/v1/me/albums?ids=${encodeURIComponent(albumIds)}`,
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      // Handle specific error codes
      if (response.status === 401) {
        throw new Error("Authentication failed. Please reconnect your Spotify account.");
      } else if (response.status === 403) {
        throw new Error("You don't have permission to save albums. Make sure your Spotify account has the right permissions.");
      } else if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else {
        throw new Error(`Failed to save albums: ${response.status} ${response.statusText}`);
      }
    }

    log("Albums successfully saved to your Spotify library!");
    
    // Set the success output
    setOutput(successMessage, {
      success: true,
      message: `Successfully saved ${albumIdList.length} album(s) to your Spotify library`
    });
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};