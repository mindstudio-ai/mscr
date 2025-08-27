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
      'Missing Apollo API Key. Please add your API key in the connector settings.',
    );
  }

  // Extract inputs with defaults
  const { sortByField, page = '1', perPage = '25', outputVariable } = inputs;

  // Build URL with query parameters
  let url = 'https://api.apollo.io/api/v1/opportunities/search';
  const queryParams = new URLSearchParams();

  if (sortByField) {
    queryParams.append('sort_by_field', sortByField);
  }

  queryParams.append('page', page.toString());
  queryParams.append('per_page', perPage.toString());

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }

  log(
    `Fetching deals from Apollo (page ${page}, ${perPage} per page)${sortByField ? `, sorted by ${sortByField}` : ''}`,
  );

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Api-Key ${apiKey}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Apollo API key.',
        );
      } else if (response.status === 403) {
        throw new Error(
          'Access forbidden. This endpoint requires a master API key. Please check your permissions.',
        );
      } else if (response.status === 429) {
        throw new Error(
          "Too many requests. You have exceeded Apollo's rate limits.",
        );
      } else {
        throw new Error(
          `Apollo API error: ${response.status} ${response.statusText}`,
        );
      }
    }

    const data = await response.json();

    // Check if opportunities array exists in the response
    if (!data.opportunities) {
      log('No deals data found in the response');
      setOutput(outputVariable, {
        opportunities: [],
        pagination: data.pagination || {},
      });
      return;
    }

    log(`Successfully retrieved ${data.opportunities.length} deals`);

    // Set the entire response as output
    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error fetching deals: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
