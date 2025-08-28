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

  // Extract and process inputs
  const {
    linkedInAccountIds,
    campaignIds,
    searchString,
    leadProfileUrl,
    seen,
    limit,
    offset,
    outputVariable,
  } = inputs;

  // Parse arrays from comma-separated strings
  const parseCommaSeparatedIds = (input: string): number[] => {
    if (!input || input.trim() === '') {
      return [];
    }
    return input
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id !== '')
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id));
  };

  // Build request body
  const requestBody = {
    filters: {
      linkedInAccountIds: parseCommaSeparatedIds(linkedInAccountIds),
      campaignIds: parseCommaSeparatedIds(campaignIds),
      searchString: searchString || '',
      leadLinkedInId: '', // Not used in this implementation
      leadProfileUrl: leadProfileUrl || '',
      seen: seen === '' ? null : seen === 'true',
    },
    offset: parseInt(offset, 10) || 0,
    limit: parseInt(limit, 10) || 10,
  };

  log('Fetching LinkedIn conversations from HeyReach...');

  try {
    // Make API request
    const response = await fetch(
      'https://api.heyreach.io/api/public/inbox/GetConversationsV2',
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

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();

    log(
      `Successfully retrieved ${data.items.length} conversations (total count: ${data.totalCount})`,
    );

    // Set output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error fetching conversations: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
