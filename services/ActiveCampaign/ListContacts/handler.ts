export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { accessToken, accountIdentifier } = process.env;

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

  const {
    email,
    search,
    listId,
    tagId,
    createdAfter,
    createdBefore,
    updatedAfter,
    updatedBefore,
    limit,
    idGreater,
    sortBy,
    sortOrder,
    outputVariable,
  } = inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (email) {
    queryParams.append('email', email);
  }
  if (search) {
    queryParams.append('search', search);
  }
  if (listId) {
    queryParams.append('listid', listId);
  }
  if (tagId) {
    queryParams.append('tagid', tagId);
  }
  if (limit) {
    queryParams.append('limit', limit);
  }
  if (idGreater) {
    queryParams.append('id_greater', idGreater);
  }

  // Handle date filters
  if (createdAfter) {
    queryParams.append('filters[created_after]', createdAfter);
  }
  if (createdBefore) {
    queryParams.append('filters[created_before]', createdBefore);
  }
  if (updatedAfter) {
    queryParams.append('filters[updated_after]', updatedAfter);
  }
  if (updatedBefore) {
    queryParams.append('filters[updated_before]', updatedBefore);
  }

  // Handle sorting
  if (sortBy && sortOrder) {
    queryParams.append(`orders[${sortBy}]`, sortOrder);
  }

  // Clean up the account identifier URL if needed
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const url = `${baseUrl}/api/3/contacts?${queryParams.toString()}`;

  log(`Fetching contacts from ActiveCampaign...`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Api-Token': accessToken,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `ActiveCampaign API error (${response.status}): ${errorText}`,
      );
    }

    const data = await response.json();

    const contactCount = data.contacts ? data.contacts.length : 0;
    log(`Successfully retrieved ${contactCount} contacts.`);

    // Set the output variable with the full response
    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error fetching contacts: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
