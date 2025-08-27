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
    fields,
    typecast,
    returnFieldsByFieldId,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }
  if (!tableIdOrName) {
    throw new Error('Table Name or ID is required');
  }
  if (!recordId) {
    throw new Error('Record ID is required');
  }
  if (!fields) {
    throw new Error('Fields to update are required');
  }

  // Get the bearer token from environment variables
  const token = process.env.token;
  if (!token) {
    throw new Error('Airtable token is missing');
  }

  // Parse fields if it's a string (though it should already be parsed by the framework)
  const fieldsObject = typeof fields === 'string' ? JSON.parse(fields) : fields;

  // Construct the API URL
  const apiUrl = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}/${encodeURIComponent(recordId)}`;

  // Prepare request body
  const requestBody: Record<string, any> = {
    fields: fieldsObject,
  };

  // Add optional parameters if they are set to true
  if (typecast === 'true') {
    requestBody.typecast = true;
  }
  if (returnFieldsByFieldId === 'true') {
    requestBody.returnFieldsByFieldId = true;
  }

  log(`Updating record ${recordId} in table ${tableIdOrName}`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update record: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    log(`Record updated successfully`);

    // Set the output variable with the updated record data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error: ${errorMessage}`);
    throw error;
  }
};
