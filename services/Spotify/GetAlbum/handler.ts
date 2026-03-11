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
  const { albumId, market, outputVariable } = inputs;
  const { clientId, clientSecret } = process.env;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify API credentials. Please check your clientId and clientSecret.');
  }

  if (!albumId) {
    throw new Error('Album ID is required');
  }

  log('Getting access token from Spotify...');

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

  log(`Retrieving album information for ID: ${albumId}`);

  // Construct the API URL with optional market parameter
  let apiUrl = `https://api.spotify.com/v1/albums/${albumId}`;
  if (market) {
    apiUrl += `?market=${market}`;
    log(`Using market filter: ${market}`);
  }

  // Make the API request to get album information
  const albumResponse = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  // Handle potential error responses
  if (!albumResponse.ok) {
    const errorText = await albumResponse.text();
    if (albumResponse.status === 401) {
      throw new Error('Unauthorized: Invalid or expired access token');
    } else if (albumResponse.status === 403) {
      throw new Error('Forbidden: You do not have permission to access this resource');
    } else if (albumResponse.status === 429) {
      throw new Error('Rate limit exceeded: Too many requests');
    } else if (albumResponse.status === 404) {
      throw new Error(`Album with ID "${albumId}" not found`);
    } else {
      throw new Error(`Spotify API error: ${albumResponse.status} ${errorText}`);
    }
  }

  // Parse and process the album data
  const albumData = await albumResponse.json() as any;

  log(`Successfully retrieved album: "${albumData.name}" by ${albumData.artists.map((a: any) => a.name).join(', ')}`);
  log(`Album contains ${albumData.total_tracks} tracks`);

  // Set the output with the album information
  setOutput(outputVariable, albumData);
};