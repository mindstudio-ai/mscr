export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Get environment variables
  const { accessToken, accountIdentifier } = process.env;

  // Validate required environment variables
  if (!accessToken) {
    throw new Error(
      'Missing API Key. Please add your ActiveCampaign API Key in the connector settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please add your ActiveCampaign Account URL in the connector settings.',
    );
  }

  // Extract input variables
  const {
    searchTerm,
    searchField,
    status,
    pipelineId,
    stageId,
    ownerId,
    createdAfter,
    createdBefore,
    minimumValue,
    maximumValue,
    sortField,
    sortDirection,
    limit = '20',
    offset = '0',
    outputVariable,
  } = inputs;

  // Construct base URL
  let baseUrl = accountIdentifier;
  if (!baseUrl.startsWith('http')) {
    baseUrl = `https://${baseUrl}`;
  }
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
  }

  // Build query parameters
  const queryParams = new URLSearchParams();

  // Add pagination parameters
  queryParams.append('limit', limit);
  queryParams.append('offset', offset);

  // Add search parameters if provided
  if (searchTerm) {
    queryParams.append('filters[search]', searchTerm);
    if (searchField) {
      queryParams.append('filters[search_field]', searchField);
    }
  }

  // Add filter parameters if provided
  if (status) {
    queryParams.append('filters[status]', status);
  }

  if (pipelineId) {
    queryParams.append('filters[group]', pipelineId);
  }

  if (stageId) {
    queryParams.append('filters[stage]', stageId);
  }

  if (ownerId) {
    queryParams.append('filters[owner]', ownerId);
  }

  if (createdAfter) {
    queryParams.append('filters[created_after]', createdAfter);
  }

  if (createdBefore) {
    queryParams.append('filters[created_before]', createdBefore);
  }

  if (minimumValue) {
    queryParams.append('filters[minimum_value]', minimumValue);
  }

  if (maximumValue) {
    queryParams.append('filters[maximum_value]', maximumValue);
  }

  // Add sorting parameters if provided
  if (sortField) {
    queryParams.append(`orders[${sortField}]`, sortDirection || 'ASC');
  }

  // Construct final URL
  const url = `${baseUrl}/api/3/deals?${queryParams.toString()}`;

  log(`Fetching deals from ActiveCampaign...`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Api-Token': accessToken,
        Accept: 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `ActiveCampaign API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    // Extract the deals array
    const deals = data.deals || [];

    log(`Successfully retrieved ${deals.length} deals.`);

    // Set the output variable
    setOutput(outputVariable, deals);
  } catch (error) {
    log(
      `Error fetching deals: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
