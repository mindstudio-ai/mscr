export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { spotifyAccessToken } = process.env;
  if (!spotifyAccessToken) {
    throw new Error("Missing Spotify access token. Please check your authentication.");
  }

  const { limit, offset, market, outputVariable } = inputs;

  // Build the query parameters
  const queryParams = new URLSearchParams();
  if (limit) queryParams.append("limit", limit);
  if (offset) queryParams.append("offset", offset);
  if (market) queryParams.append("market", market);

  const queryString = queryParams.toString();
  const url = `https://api.spotify.com/v1/me/albums${queryString ? `?${queryString}` : ''}`;

  log("Retrieving your saved albums from Spotify...");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) {
        throw new Error("Unauthorized: Your Spotify access token is invalid or expired.");
      } else if (response.status === 403) {
        throw new Error("Forbidden: You don't have permission to access this resource. Make sure your account has the 'user-library-read' scope.");
      } else if (response.status === 429) {
        throw new Error("Rate limit exceeded: Too many requests to the Spotify API.");
      } else {
        throw new Error(`Spotify API error (${response.status}): ${errorText}`);
      }
    }

    const data = await response.json() as any;
    
    log(`Successfully retrieved ${data.items.length} of ${data.total} saved albums.`);
    
    if (data.next) {
      log("Note: There are more albums available. Adjust the limit and offset to retrieve more.");
    }

    setOutput(outputVariable, data);
  } catch (error) {
    log("Failed to retrieve saved albums.");
    throw error;
  }
};