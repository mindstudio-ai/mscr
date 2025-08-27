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
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing Airtable access token');
  }

  const {
    baseId,
    tableId,
    fieldId,
    fieldName,
    fieldDescription,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }
  if (!tableId) {
    throw new Error('Table ID is required');
  }
  if (!fieldId) {
    throw new Error('Field ID is required');
  }

  // At least one of fieldName or fieldDescription must be provided
  if (!fieldName && !fieldDescription) {
    throw new Error(
      'At least one of Field Name or Field Description must be provided',
    );
  }

  // Prepare request body with only the provided fields
  const requestBody: Record<string, string> = {};
  if (fieldName) {
    requestBody.name = fieldName;
  }
  if (fieldDescription) {
    requestBody.description = fieldDescription;
  }

  log(`Updating field ${fieldId} in table ${tableId}`);

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/meta/bases/${baseId}/tables/${tableId}/fields/${fieldId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Airtable API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    log(`Field updated successfully`);

    // Set the output variable with the API response
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error updating field: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};
