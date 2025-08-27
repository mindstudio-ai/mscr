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
  const { baseId, tableIdOrName, name, description, outputVariable } = inputs;

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }

  if (!tableIdOrName) {
    throw new Error('Table ID or Name is required');
  }

  // Ensure at least one update field is provided
  if (!name && !description) {
    throw new Error(
      'At least one update field (name or description) must be provided',
    );
  }

  // Get authentication token from environment variables
  const token = process.env.token;
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  // Prepare request body with only the fields that are provided
  const requestBody: Record<string, any> = {};
  if (name !== undefined) {
    requestBody.name = name;
  }
  if (description !== undefined) {
    requestBody.description = description;
  }

  // Log the action being performed
  log(`Updating table "${tableIdOrName}" in base "${baseId}"`);

  try {
    // Make the API request to update the table
    const response = await fetch(
      `https://api.airtable.com/v0/meta/bases/${encodeURIComponent(baseId)}/tables/${encodeURIComponent(tableIdOrName)}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update table: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse the response
    const updatedTable = await response.json();

    // Log success message with details
    log(`Successfully updated table to "${updatedTable.name}"`);

    // Set the output variable with the API response
    setOutput(outputVariable, updatedTable);
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error updating table: ${errorMessage}`);
    throw error;
  }
};
