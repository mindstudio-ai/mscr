export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract inputs
  const {
    baseId,
    tableId,
    fieldName,
    fieldType,
    fieldDescription,
    selectOptions,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }
  if (!tableId) {
    throw new Error('Table ID is required');
  }
  if (!fieldName) {
    throw new Error('Field Name is required');
  }
  if (!fieldType) {
    throw new Error('Field Type is required');
  }

  // Get authentication token
  const token = process.env.token;
  if (!token) {
    throw new Error('Airtable authentication token is missing');
  }

  // Prepare request URL
  const url = `https://api.airtable.com/v0/meta/bases/${baseId}/tables/${tableId}/fields`;

  // Prepare request body
  const requestBody: Record<string, any> = {
    name: fieldName,
    type: fieldType,
  };

  // Add description if provided
  if (fieldDescription) {
    requestBody.description = fieldDescription;
  }

  // Add options based on field type
  if (fieldType === 'singleSelect' && selectOptions) {
    const options = selectOptions.split(',').map((option) => option.trim());
    requestBody.options = {
      choices: options.map((option) => ({
        name: option,
      })),
    };
  }

  log(`Creating new ${fieldType} field "${fieldName}" in table ${tableId}`);

  try {
    // Make API request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Parse response
    const responseData = await response.json();

    // Check for errors
    if (!response.ok) {
      const errorMessage =
        responseData.error?.message || 'Unknown error occurred';
      throw new Error(`Airtable API error: ${errorMessage}`);
    }

    log(
      `Successfully created field "${fieldName}" with ID: ${responseData.id}`,
    );

    // Set output variable with the created field information
    setOutput(outputVariable, responseData);
  } catch (error) {
    log(
      `Error creating field: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
