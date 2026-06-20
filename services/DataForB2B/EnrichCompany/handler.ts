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

  const { companyIdentifier, outputVariable } = inputs;

  if (!companyIdentifier) {
    throw new Error('Please provide a Company Identifier.');
  }

  log(`Enriching DataForB2B company: ${companyIdentifier}...`);

  const response = await fetch('https://api.dataforb2b.ai/enrich/company', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      api_key: apiKey,
    },
    body: JSON.stringify({ company_identifier: companyIdentifier }),
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
  log('Company enriched.');
  setOutput(outputVariable, data);
};
