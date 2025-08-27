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
  // Extract inputs
  const { baseId, tableIdOrName, apiEndpointSyncId, csvData, outputVariable } =
    inputs;

  // Get authentication token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing Airtable authentication token');
  }

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }
  if (!tableIdOrName) {
    throw new Error('Table ID or Name is required');
  }
  if (!apiEndpointSyncId) {
    throw new Error('API Endpoint Sync ID is required');
  }
  if (!csvData) {
    throw new Error('CSV data is required');
  }

  // Construct the API URL
  const encodedTableName = encodeURIComponent(tableIdOrName);
  const url = `https://api.airtable.com/v0/${baseId}/${encodedTableName}/sync/${apiEndpointSyncId}`;

  log(`Syncing CSV data to Airtable table: ${tableIdOrName}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/csv',
      },
      body: csvData,
    });

    // Handle error responses
    if (!response.ok) {
      let errorText;
      try {
        const errorData = await response.json();
        errorText = errorData.error?.message || `HTTP error ${response.status}`;
      } catch (e) {
        errorText = `HTTP error ${response.status}`;
      }
      throw new Error(`Airtable sync failed: ${errorText}`);
    }

    // Parse and return the successful response
    const result = await response.json();
    log('CSV data successfully synced to Airtable');

    // Set the output variable with the response
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle any errors that occurred during the request
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error: ${errorMessage}`);
    throw error;
  }
};
