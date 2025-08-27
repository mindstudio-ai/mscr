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
  // Extract the bearer token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing authentication token');
  }

  // Extract inputs
  const { baseId, tableName, tableDescription, fields, outputVariable } =
    inputs;

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }
  if (!tableName) {
    throw new Error('Table name is required');
  }
  if (!fields || !Array.isArray(fields) || fields.length === 0) {
    throw new Error('At least one field must be defined');
  }

  // Construct the request payload
  const payload = {
    name: tableName,
    fields: fields,
  };

  // Add description if provided
  if (tableDescription) {
    payload['description'] = tableDescription;
  }

  log(`Creating table "${tableName}" in base ${baseId}...`);

  try {
    // Make the API request to create the table
    const response = await fetch(
      `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error?.message ||
        `Failed to create table: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    // Parse the response
    const tableData = await response.json();

    log(`Table "${tableName}" created successfully with ID: ${tableData.id}`);

    // Set the output variable with the table information
    setOutput(outputVariable, tableData);
  } catch (error) {
    // Handle errors
    log(`Error creating table: ${error.message}`);
    throw error;
  }
};
