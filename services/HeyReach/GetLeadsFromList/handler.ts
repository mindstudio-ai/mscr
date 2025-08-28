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
      'Missing HeyReach API Key. Please add your API key in the connector settings.',
    );
  }

  // Extract required inputs
  const {
    listId,
    limit,
    offset = '0',
    keyword,
    leadProfileUrl,
    leadLinkedInId,
    createdFrom,
    createdTo,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  // Prepare request body - only include parameters that are provided
  const requestBody: Record<string, any> = {
    listId: parseInt(listId, 10),
    limit: parseInt(limit, 10),
    offset: parseInt(offset, 10),
  };

  // Add optional parameters if they exist
  if (keyword) {
    requestBody.keyword = keyword;
  }
  if (leadProfileUrl) {
    requestBody.leadProfileUrl = leadProfileUrl;
  }
  if (leadLinkedInId) {
    requestBody.leadLinkedInId = leadLinkedInId;
  }
  if (createdFrom) {
    requestBody.createdFrom = createdFrom;
  }
  if (createdTo) {
    requestBody.createdTo = createdTo;
  }

  log(`Retrieving leads from list ID: ${listId}`);

  try {
    // Make the API request
    const response = await fetch(
      'https://api.heyreach.io/api/public/list/GetLeadsFromList',
      {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          Accept: 'text/plain',
        },
        body: JSON.stringify(requestBody),
      },
    );

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.errorMessage ||
        `Request failed with status: ${response.status}`;

      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid API key');
      } else if (response.status === 404) {
        throw new Error(`List not found: ${errorMessage}`);
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else {
        throw new Error(`Error retrieving leads: ${errorMessage}`);
      }
    }

    // Parse and process the response
    const data = await response.json();

    log(
      `Successfully retrieved ${data.items.length} leads out of ${data.totalCount} total`,
    );

    // Set the output variable with the full response
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Unexpected error: ${String(error)}`);
    }
  }
};
