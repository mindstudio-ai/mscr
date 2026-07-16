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
  const { limit, offset, outputVariable } = inputs;
  //Retrieve OAuth credentials
  const { clientId, clientSecret } = process.env;

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(
      `Failed to get access token: ${tokenResponse.status} ${tokenResponse.statusText}`
    );
  }

  const tokenData = (await tokenResponse.json()) as { access_token: string };
  const accessToken = tokenData.access_token;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Missing Spotify API credentials. Please check your clientId and clientSecret."
    );
  }
  // Extract and validate inputs

  // Build URL with query parameters
  const params = new URLSearchParams();

  // Add limit parameter if provided (default is 20)
  if (limit) {
    const limitNum = parseInt(limit, 10);
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 50) {
      throw new Error("Limit must be a number between 1 and 50");
    }
    params.append("limit", limit);
  }

  // Add offset parameter if provided (default is 0)
  if (offset) {
    const offsetNum = parseInt(offset, 10);
    if (isNaN(offsetNum) || offsetNum < 0) {
      throw new Error("Offset must be a non-negative number");
    }
    params.append("offset", offset);
  }

  // Construct the full URL
  const url = `https://api.spotify.com/v1/browse/new-releases?${params.toString()}`;

  log(
    `Fetching new releases from Spotify (limit: ${limit}, offset: ${offset})...`
  );

  try {
    // Make the API request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || response.statusText;
      throw new Error(
        `Spotify API error (${response.status}): ${errorMessage}`
      );
    }

    // Parse the response
    const data = (await response.json()) as any;

    log(`Successfully retrieved ${data.albums.items.length} new releases`);

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error fetching new releases: ${errorMessage}`);
    throw error;
  }
};
