export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Get the API token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing Airtable API token');
  }

  // Extract required inputs
  const { baseId, tableIdOrName, outputVariable } = inputs;
  if (!baseId) {
    throw new Error('Base ID is required');
  }
  if (!tableIdOrName) {
    throw new Error('Table name or ID is required');
  }

  // Build the API URL
  const baseUrl = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}`;

  // Build query parameters
  const queryParams = new URLSearchParams();

  // Add optional parameters if provided
  if (inputs.maxRecords) {
    queryParams.append('maxRecords', inputs.maxRecords);
  }

  if (inputs.pageSize) {
    queryParams.append('pageSize', inputs.pageSize);
  }

  if (inputs.view) {
    queryParams.append('view', inputs.view);
  }

  if (inputs.filterByFormula) {
    queryParams.append('filterByFormula', inputs.filterByFormula);
  }

  // Process fields if provided
  if (inputs.fields) {
    const fieldsList = inputs.fields
      .split(',')
      .map((field: string) => field.trim());
    fieldsList.forEach((field: string) => {
      queryParams.append('fields[]', field);
    });
  }

  // Process sort if provided
  if (inputs.sortField) {
    const sortDirection = inputs.sortDirection || 'asc';
    queryParams.append('sort[0][field]', inputs.sortField);
    queryParams.append('sort[0][direction]', sortDirection);
  }

  // Default to JSON cell format
  queryParams.append('cellFormat', 'json');

  // Build the full URL
  const url = `${baseUrl}?${queryParams.toString()}`;

  log(`Fetching records from Airtable table: ${tableIdOrName}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error?.message || `HTTP error ${response.status}`;
      throw new Error(`Airtable API error: ${errorMessage}`);
    }

    const data = await response.json();

    // Check if we have records
    if (!data.records || !Array.isArray(data.records)) {
      log('No records found or invalid response format');
      setOutput(outputVariable, []);
      return;
    }

    log(`Successfully retrieved ${data.records.length} records`);

    // Set the output variable with the records
    setOutput(outputVariable, data.records);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error fetching records: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while fetching records');
  }
};
