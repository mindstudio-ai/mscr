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
  // Extract inputs and environment variables
  const { profileUrl, outputVariable } = inputs;
  const { apiKey } = process.env;

  // Validate required inputs and environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API Key in the service settings.',
    );
  }

  if (!profileUrl) {
    throw new Error('LinkedIn Profile URL is required.');
  }

  // Log the operation being performed
  log(`Retrieving tags for LinkedIn profile: ${profileUrl}`);

  try {
    // Make the API request to HeyReach
    const response = await fetch(
      'https://api.heyreach.io/api/public/lead/GetTags',
      {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          Accept: 'text/plain',
        },
        body: JSON.stringify({
          profileUrl,
        }),
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HeyReach API error (${response.status}): ${errorText}`);
    }

    // Parse the response
    const data = await response.json();

    // Extract tags from the response
    const tags = data.tags || [];

    // Log the result
    if (tags.length > 0) {
      log(`Successfully retrieved ${tags.length} tags for the profile.`);
    } else {
      log('No tags found for this LinkedIn profile.');
    }

    // Set the output variable with the tags
    setOutput(outputVariable, tags);
  } catch (error) {
    // Handle any errors that occurred during the API request
    log(
      `Error retrieving tags: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
