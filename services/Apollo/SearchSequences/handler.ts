export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing Apollo API Key. Please check your connection settings.',
    );
  }

  const { sequenceName, page = '1', perPage = '10', outputVariable } = inputs;

  // Prepare request body
  const requestBody: Record<string, string> = {};

  if (sequenceName) {
    requestBody.q_name = sequenceName;
  }

  if (page) {
    requestBody.page = page;
  }

  if (perPage) {
    requestBody.per_page = perPage;
  }

  log(
    `Searching for sequences${sequenceName ? ` with name containing "${sequenceName}"` : ''} (page ${page}, ${perPage} per page)`,
  );

  try {
    const response = await fetch(
      'https://api.apollo.io/api/v1/emailer_campaigns/search',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid API key');
      } else if (response.status === 403) {
        throw new Error(
          'Forbidden: This endpoint requires a master API key and is not accessible on free plans',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded: Too many requests');
      } else {
        throw new Error(
          `Apollo API error: ${response.status} ${response.statusText}`,
        );
      }
    }

    const data = await response.json();

    const totalSequences = data.emailer_campaigns?.length || 0;
    log(`Found ${totalSequences} sequence${totalSequences !== 1 ? 's' : ''}`);

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error searching sequences: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while searching sequences');
  }
};
