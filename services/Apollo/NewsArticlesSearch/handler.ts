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
    throw new Error('Missing Apollo API Key');
  }

  const {
    organizationIds,
    categories,
    publishedMin,
    publishedMax,
    perPage = '25',
    page = '1',
    outputVariable,
  } = inputs;

  if (!organizationIds) {
    throw new Error('Organization IDs are required');
  }

  // Prepare request body
  const requestBody: Record<string, any> = {};

  // Process organization IDs
  requestBody['organization_ids[]'] = organizationIds
    .split(',')
    .map((id) => id.trim());
  log(
    `Searching news for ${requestBody['organization_ids[]'].length} organizations`,
  );

  // Process categories if provided
  if (categories) {
    requestBody['categories[]'] = categories
      .split(',')
      .map((category) => category.trim());
    log(`Filtering by categories: ${requestBody['categories[]'].join(', ')}`);
  }

  // Process date range if provided
  if (publishedMin) {
    requestBody['published_at[min]'] = publishedMin;
    log(`Looking for articles published after ${publishedMin}`);
  }

  if (publishedMax) {
    requestBody['published_at[max]'] = publishedMax;
    log(`Looking for articles published before ${publishedMax}`);
  }

  // Process pagination
  requestBody.page = parseInt(page, 10);
  requestBody.per_page = parseInt(perPage, 10);

  try {
    log('Sending request to Apollo API...');
    const response = await fetch(
      'https://api.apollo.io/api/v1/news_articles/search',
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
      const errorText = await response.text();
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Apollo API key.',
        );
      } else if (response.status === 422) {
        throw new Error(`Invalid request parameters: ${errorText}`);
      } else {
        throw new Error(
          `Apollo API request failed with status ${response.status}: ${errorText}`,
        );
      }
    }

    const data = await response.json();
    log(`Found ${data.pagination?.total_entries || 0} news articles`);

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};
