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
  const {
    baseId,
    tableIdOrName,
    recordId,
    cellFormat = 'json',
    returnFieldsByFieldId = false,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }
  if (!tableIdOrName) {
    throw new Error('Table ID or Name is required');
  }
  if (!recordId) {
    throw new Error('Record ID is required');
  }

  // Get bearer token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Airtable token is missing. Please check your connection settings.',
    );
  }

  // Construct the API URL
  const baseUrl = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}/${encodeURIComponent(recordId)}`;

  // Add query parameters if provided
  const queryParams = new URLSearchParams();
  if (cellFormat) {
    queryParams.append('cellFormat', cellFormat);
  }
  if (returnFieldsByFieldId) {
    queryParams.append('returnFieldsByFieldId', String(returnFieldsByFieldId));
  }

  const url = queryParams.toString()
    ? `${baseUrl}?${queryParams.toString()}`
    : baseUrl;

  log(`Retrieving record from Airtable: ${tableIdOrName}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorBody = await response.text();
      log(`Error retrieving record: ${response.status} ${response.statusText}`);
      throw new Error(`Airtable API error (${response.status}): ${errorBody}`);
    }

    // Parse the response
    const record = await response.json();

    log(`Successfully retrieved record: ${recordId}`);

    // Set the output variable
    setOutput(outputVariable, record);
  } catch (error) {
    // Handle any errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving the record');
  }
};
