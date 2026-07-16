export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { accessToken } = process.env;
  if (!accessToken) {
    throw new Error("Missing Spotify access token");
  }

  const { albumIds, outputVariable } = inputs;
  
  if (!albumIds) {
    throw new Error("Album IDs are required");
  }

  // Clean and validate album IDs
  const cleanedIds = albumIds.trim();
  const idArray = cleanedIds.split(",").map(id => id.trim()).filter(id => id);
  
  if (idArray.length === 0) {
    throw new Error("At least one album ID is required");
  }
  
  if (idArray.length > 20) {
    throw new Error("Maximum of 20 album IDs can be checked at once");
  }

  log(`Checking if ${idArray.length} album(s) are saved in your Spotify library...`);

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/albums/contains?ids=${encodeURIComponent(cleanedIds)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) {
        throw new Error("Spotify authentication failed. Please check your connection settings.");
      } else if (response.status === 403) {
        throw new Error("You don't have permission to access this information. Make sure your Spotify account has the necessary permissions.");
      } else if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else {
        throw new Error(`Spotify API error (${response.status}): ${errorText}`);
      }
    }

    const results = await response.json() as boolean[];
    
    // Create a more readable output with album IDs and their saved status
    const savedStatus = idArray.map((id, index) => ({
      albumId: id,
      isSaved: results[index]
    }));

    // Count how many albums are saved
    const savedCount = results.filter(result => result).length;
    log(`Found ${savedCount} out of ${idArray.length} album(s) saved in your library.`);

    // Set the raw boolean array as the output
    setOutput(outputVariable, results);
    
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to check saved albums: ${String(error)}`);
  }
};