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
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your HeyReach API key in the connector settings.',
    );
  }

  // Extract and validate inputs
  const {
    listId,
    offset = '0',
    keyword,
    limit = '100',
    outputVariable,
  } = inputs;

  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  // Prepare request body
  const requestBody: Record<string, any> = {
    listId: parseInt(listId, 10),
    offset: parseInt(offset, 10),
    limit: parseInt(limit, 10),
  };

  // Add keyword to request body if provided
  if (keyword) {
    requestBody.keyword = keyword;
  }

  log(`Retrieving companies from list ID: ${listId}`);

  try {
    // Make API request to HeyReach
    const response = await fetch(
      'https://api.heyreach.io/api/public/list/GetCompaniesFromList',
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

    // Handle error responses
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Error retrieving companies: ${response.status} ${response.statusText}`;

      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.errorMessage) {
          errorMessage = `Error: ${errorJson.errorMessage}`;
        } else if (errorJson.detail) {
          errorMessage = `Error: ${errorJson.detail}`;
        }
      } catch (e) {
        // If parsing fails, use the raw error text
        if (errorText) {
          errorMessage = `Error: ${errorText}`;
        }
      }

      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (response.status === 404) {
        throw new Error(`List with ID ${listId} not found.`);
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(errorMessage);
      }
    }

    // Parse successful response
    const data = await response.json();

    log(
      `Successfully retrieved ${data.items?.length || 0} companies out of ${data.totalCount || 0} total`,
    );

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`An unexpected error occurred: ${String(error)}`);
    }
  }
};
