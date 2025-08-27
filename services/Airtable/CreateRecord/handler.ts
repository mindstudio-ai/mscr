export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Get inputs
  const { baseId, tableName, fields, typecast, outputVariable } = inputs;
  const { token } = process.env;

  // Validate inputs
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your connection settings.',
    );
  }

  if (!baseId) {
    throw new Error('Base ID is required');
  }

  if (!tableName) {
    throw new Error('Table name or ID is required');
  }

  // Ensure fields is an object
  const recordFields = typeof fields === 'string' ? JSON.parse(fields) : fields;

  log(`Creating record in Airtable base: ${baseId}, table: ${tableName}`);

  // Prepare the request payload
  const payload = {
    records: [
      {
        fields: recordFields,
      },
    ],
  };

  // Add typecast option if provided
  if (typecast === 'true') {
    payload.typecast = true;
  }

  try {
    // Make the API request
    const response = await fetch(
      `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableName)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Airtable API error: ${errorData.error?.message || response.statusText}`,
      );
    }

    const data = await response.json();

    if (!data.records || data.records.length === 0) {
      throw new Error('No records were created');
    }

    const createdRecordId = data.records[0].id;
    log(`Successfully created record with ID: ${createdRecordId}`);

    // Set output
    setOutput(outputVariable, createdRecordId);
  } catch (error) {
    log(`Error creating record: ${error.message}`);
    throw error;
  }
};
