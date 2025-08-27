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
    throw new Error(
      'Missing Apollo API Key. Please add your API key in the connector settings.',
    );
  }

  // Extract inputs with defaults
  const {
    keywords,
    contactStageIds,
    sortByField,
    sortOrder,
    perPage = '25',
    page = '1',
    outputVariable,
  } = inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();

  // Add search parameters if provided
  if (keywords) {
    queryParams.append('q_keywords', keywords);
  }

  // Handle contact stage IDs (comma-separated string to array)
  if (contactStageIds) {
    const stageIds = contactStageIds.split(',').map((id) => id.trim());
    stageIds.forEach((id) => {
      queryParams.append('contact_stage_ids[]', id);
    });
  }

  // Add sorting parameters if provided
  if (sortByField) {
    queryParams.append('sort_by_field', sortByField);
    queryParams.append('sort_ascending', sortOrder || 'false');
  }

  // Add pagination parameters
  queryParams.append('per_page', perPage);
  queryParams.append('page', page);

  // Construct the API URL
  const apiUrl = `https://api.apollo.io/api/v1/contacts/search`;

  log(`Searching for contacts in Apollo...`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({}),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Apollo API returned an error: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    // Log the results
    const totalContacts = data.contacts?.length || 0;
    const totalResults = data.pagination?.total_entries || totalContacts;

    log(
      `Found ${totalContacts} contacts${totalResults > totalContacts ? ` (of ${totalResults} total)` : ''}`,
    );

    // Set the output
    setOutput(outputVariable, data);
  } catch (error) {
    log(`Error searching Apollo contacts: ${error.message}`);
    throw error;
  }
};
