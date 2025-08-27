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
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error('Missing Apollo API Key');
  }

  // Extract inputs with defaults
  const {
    organizationName,
    accountStageIds,
    sortByField = 'account_last_activity_date',
    sortAscending = 'false',
    perPage = '10',
    page = '1',
    outputVariable,
  } = inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (organizationName) {
    queryParams.append('q_organization_name', organizationName);
  }

  if (accountStageIds) {
    // Handle comma-separated account stage IDs
    const stageIds = accountStageIds.split(',').map((id) => id.trim());
    stageIds.forEach((id) => {
      queryParams.append('account_stage_ids[]', id);
    });
  }

  if (sortByField) {
    queryParams.append('sort_by_field', sortByField);
  }

  queryParams.append('sort_ascending', sortAscending);
  queryParams.append('page', page);
  queryParams.append('per_page', perPage);

  const url = `https://api.apollo.io/api/v1/accounts/search?${queryParams.toString()}`;

  log(
    `Searching for accounts in Apollo${organizationName ? ` with name containing "${organizationName}"` : ''}`,
  );

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `Api-Key ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 401) {
        throw new Error('Unauthorized: Please check your Apollo API key');
      } else if (response.status === 403) {
        throw new Error(
          'Forbidden: You do not have permission to access this resource',
        );
      } else if (response.status === 422) {
        throw new Error(`Invalid request parameters: ${errorText}`);
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded: Too many requests to Apollo API');
      } else {
        throw new Error(`Apollo API error (${response.status}): ${errorText}`);
      }
    }

    const data = await response.json();

    // Log information about results
    const totalAccounts = data.pagination?.total_entries || 0;
    const currentPage = data.pagination?.page || 1;
    const totalPages = data.pagination?.total_pages || 1;

    log(
      `Found ${totalAccounts} accounts (Page ${currentPage} of ${totalPages})`,
    );

    // Set the output variable with the full response
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error searching for accounts: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while searching for accounts');
  }
};
