export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing DataForB2B API Key. Please add your API key in the service configuration.',
    );
  }

  const {
    query,
    category = 'people',
    maxResults = '25',
    sessionId,
    enrichLive = 'false',
    outputVariable,
  } = inputs;

  if (!query && !sessionId) {
    throw new Error('Please provide a Search Query.');
  }

  const requestBody: Record<string, any> = {
    category: category === 'companies' ? 'companies' : 'people',
    max_results: parseInt(maxResults, 10),
    enrich_live: enrichLive === 'true',
  };
  if (query) {
    requestBody.query = query;
  }
  if (sessionId) {
    requestBody.session_id = sessionId;
  }

  log(`Running DataForB2B reasoning search for ${requestBody.category}...`);

  const response = await fetch('https://api.dataforb2b.ai/search/reasoning', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      api_key: apiKey,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 429) {
      throw new Error(
        'DataForB2B rate limit exceeded. Please try again in a moment.',
      );
    }
    throw new Error(
      `DataForB2B request failed: ${response.status} ${response.statusText}. ${errorText}`,
    );
  }

  const data = await response.json();

  if (data.status === 'needs_input') {
    log(
      'The query needs clarification. Refine your Search Query with more detail and run again.',
    );
  } else {
    log(`Found ${data.total ?? data.count ?? 0} matching results.`);
  }

  setOutput(outputVariable, data);
};
