export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  //Extract inputs
  const { albumIds, market, outputVariable } = inputs;

  //Retrieve OAuth Credentials
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

  if (!accessToken) {
    throw new Error('Missing Spotify access token. Please check your configuration.');
  }
  
  if (!albumIds) {
    throw new Error('Album IDs are required. Please provide at least one Spotify album ID.');
  }

  // Construct the URL with query parameters
  const url = new URL('https://api.spotify.com/v1/albums');
  url.searchParams.append('ids', albumIds);
  
  if (market) {
    url.searchParams.append('market', market);
  }

  log(`Fetching information for ${albumIds.split(',').length} albums from Spotify...`);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const statusText = response.statusText || 'Unknown error';
      const errorMessage = errorData?.error?.message || statusText;
      
      throw new Error(`Spotify API error (${response.status}): ${errorMessage}`);
    }

    const data = await response.json() as any;
    
    log(`Successfully retrieved ${data.albums.length} albums from Spotify`);
    
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch album data: ${error.message}`);
    }
    throw new Error('An unknown error occurred while fetching album data');
  }
};