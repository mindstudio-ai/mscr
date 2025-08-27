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

  const { domain, outputVariable } = inputs;

  if (!domain) {
    throw new Error('Company domain is required');
  }

  log(`Looking up company information for ${domain}...`);

  // Construct the API URL with the domain as a query parameter
  const url = `https://api.apollo.io/api/v1/organizations/enrich?domain=${encodeURIComponent(domain)}`;

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${apiKey}`,
      },
    });

    // Handle different response statuses
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Apollo API key.',
        );
      } else if (response.status === 422) {
        throw new Error(
          'Validation error. Please check the company domain format.',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Apollo API error: ${response.status} ${response.statusText}`,
        );
      }
    }

    // Parse the response
    const data = await response.json();

    if (!data.organization) {
      log('No organization data found for this domain.');
    } else {
      log(
        `Successfully retrieved company information for ${data.organization.name || domain}`,
      );
    }

    // Set the output variable with the full response
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to enrich organization data: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while enriching organization data',
      );
    }
  }
};
