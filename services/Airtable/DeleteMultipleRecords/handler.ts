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
  const { baseId, tableIdOrName, recordIds, outputVariable } = inputs;
  const token = process.env.token;

  // Validate required inputs
  if (!token) {
    throw new Error('Missing Airtable authentication token');
  }

  if (!baseId) {
    throw new Error('Base ID is required');
  }

  if (!tableIdOrName) {
    throw new Error('Table name or ID is required');
  }

  if (!recordIds) {
    throw new Error('At least one record ID is required');
  }

  // Parse and validate record IDs
  const recordIdsArray = recordIds
    .split(',')
    .map((id) => id.trim())
    .filter((id) => id);

  if (recordIdsArray.length === 0) {
    throw new Error('At least one valid record ID is required');
  }

  if (recordIdsArray.length > 10) {
    throw new Error('You can only delete up to 10 records at once');
  }

  // Construct the URL with query parameters
  const baseUrl = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}`;

  // Build query string with record IDs
  const queryParams = recordIdsArray
    .map((id) => `records[]=${encodeURIComponent(id)}`)
    .join('&');
  const url = `${baseUrl}?${queryParams}`;

  log(
    `Deleting ${recordIdsArray.length} record(s) from table "${tableIdOrName}"`,
  );

  try {
    // Make the DELETE request to Airtable API
    const response = await fetch(url, {
      method: 'DELETE',
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

    log(`Successfully deleted ${data.records.length} record(s)`);

    // Set the output variable with the deletion results
    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error deleting records: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
