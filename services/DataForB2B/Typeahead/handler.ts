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

  const { type, q, limit = '20', outputVariable } = inputs;

  if (!type || !q) {
    throw new Error('Please provide both a Type and a Query.');
  }

  const params = new URLSearchParams({
    type,
    q,
    limit: String(parseInt(limit, 10) || 20),
  });

  log(`Looking up DataForB2B ${type} suggestions for "${q}"...`);

  const response = await fetch(
    `https://api.dataforb2b.ai/typeahead?${params.toString()}`,
    {
      method: 'GET',
      headers: {
        api_key: apiKey,
      },
    },
  );

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
  log(`Found ${data.results?.length ?? 0} suggestion(s).`);
  setOutput(outputVariable, data);
};
