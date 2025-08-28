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
  // Get API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API key in the connector settings.',
    );
  }

  // Extract inputs
  const { listId, profileUrls, outputVariable } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!profileUrls) {
    throw new Error('LinkedIn Profile URLs are required');
  }

  // Process profile URLs by splitting on newlines and filtering out empty lines
  const profileUrlsArray = profileUrls
    .split('\n')
    .map((url) => url.trim())
    .filter((url) => url.length > 0);

  if (profileUrlsArray.length === 0) {
    throw new Error('At least one valid LinkedIn Profile URL is required');
  }

  log(
    `Preparing to delete ${profileUrlsArray.length} leads from list ID: ${listId}`,
  );

  // Prepare request data
  const requestData = {
    listId: Number(listId),
    profileUrls: profileUrlsArray,
  };

  try {
    // Make the API request
    log('Sending request to HeyReach API...');
    const response = await fetch(
      'https://api.heyreach.io/api/public/list/DeleteLeadsFromListByProfileUrl',
      {
        method: 'DELETE',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          Accept: 'text/plain',
        },
        body: JSON.stringify(requestData),
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HeyReach API error (${response.status}): ${errorText}`);
    }

    // Parse the response
    const responseData = await response.json();

    // Get the array of leads not found in the list
    const notFoundInList = responseData.notFoundInList || [];

    // Log results
    if (notFoundInList.length > 0) {
      log(
        `Operation completed. ${notFoundInList.length} leads were not found in the list.`,
      );
    } else {
      log(
        `Operation completed. All leads were successfully deleted from the list.`,
      );
    }

    // Set the output variable with the leads not found in the list
    setOutput(outputVariable, notFoundInList);
  } catch (error) {
    // Handle errors
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
