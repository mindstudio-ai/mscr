export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {

  //Extract Inputs
  const { albumId, market, limit, offset, outputVariable } = inputs;
  
  //Retrieve OAuth credentials
  const { clientId, clientSecret } = process.env;

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

  if (!albumId) {
    throw new Error("Album ID is required");
  }

  // Build URL with query parameters
  let url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
  const params = new URLSearchParams();
  
  if (market) params.append("market", market);
  if (limit) params.append("limit", limit.toString());
  if (offset) params.append("offset", offset.toString());
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  log(`Fetching tracks for album ID: ${albumId}`);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
       'Authorization': `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json() as any;
      const status = response.status;
      
      if (status === 401) {
        throw new Error("Authentication failed. Please check your Spotify credentials.");
      } else if (status === 403) {
        throw new Error("You don't have permission to access this resource.");
      } else if (status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else {
        throw new Error(`Spotify API error: ${errorData.error?.message || response.statusText}`);
      }
    }

    const data = await response.json() as any;
    log(`Successfully retrieved ${data.items.length} tracks from album`);
    
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error("An unknown error occurred while fetching album tracks");
  }
};