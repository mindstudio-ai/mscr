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
      'Missing API Key. Please check your beehiiv connection settings.',
    );
  }

  const {
    publicationId,
    limit = '10',
    page = '1',
    order = 'asc',
    outputVariable,
  } = inputs;

  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!publicationId.startsWith('pub_')) {
    throw new Error(
      "Invalid Publication ID format. It should start with 'pub_'",
    );
  }

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (limit) {
    queryParams.append('limit', limit);
  }
  if (page) {
    queryParams.append('page', page);
  }
  if (order) {
    queryParams.append('order', order);
  }

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : '';
  const url = `https://api.beehiiv.com/v2/publications/${publicationId}/post_templates${queryString}`;

  log(`Fetching post templates for publication ${publicationId}...`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    log(`Successfully retrieved ${data.data.length} post templates`);

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error fetching post templates: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while fetching post templates');
  }
};
