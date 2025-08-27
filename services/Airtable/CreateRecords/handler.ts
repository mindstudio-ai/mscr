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
    tableIdOrName,
    recordData,
    createMultiple,
    typecast,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }

  if (!tableIdOrName) {
    throw new Error('Table name or ID is required');
  }

  if (!recordData) {
    throw new Error('Record data is required');
  }

  // Get token from environment variables
  const token = process.env.token;
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  // Prepare request URL
  const url = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}`;

  // Parse recordData if it's a string
  let parsedData = recordData;
  if (typeof recordData === 'string') {
    try {
      parsedData = JSON.parse(recordData);
    } catch (error) {
      throw new Error('Invalid JSON in record data');
    }
  }

  // Format request body based on createMultiple flag
  let requestBody: any = {};

  if (createMultiple === 'true') {
    // For multiple records
    if (Array.isArray(parsedData)) {
      requestBody.records = parsedData;
    } else {
      // If user provided a single object but selected multiple records
      log(
        'Warning: You selected "Multiple Records" but provided a single record object. Converting to array format.',
      );
      requestBody.records = [{ fields: parsedData }];
    }
  } else {
    // For a single record
    if (Array.isArray(parsedData)) {
      // If user provided an array but selected single record
      log(
        'Warning: You selected "Single Record" but provided an array of records. Using only the first record.',
      );
      requestBody.fields = parsedData[0]?.fields || parsedData[0];
    } else if (parsedData.fields) {
      // If the data already has a fields property
      requestBody.fields = parsedData.fields;
    } else {
      // Assume the data is the fields object directly
      requestBody.fields = parsedData;
    }
  }

  // Add typecast if enabled
  if (typecast === 'true') {
    requestBody.typecast = true;
  }

  log(
    `Creating ${createMultiple === 'true' ? 'multiple records' : 'a record'} in table "${tableIdOrName}"`,
  );

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Parse the response
    const responseData = await response.json();

    // Check for errors
    if (!response.ok) {
      const errorMessage =
        responseData.error?.message || 'Unknown error occurred';
      throw new Error(`Airtable API error: ${errorMessage}`);
    }

    // Log success message
    if (createMultiple === 'true') {
      const recordCount = responseData.records?.length || 0;
      log(`Successfully created ${recordCount} record(s)`);
    } else {
      log(`Successfully created record with ID: ${responseData.id}`);
    }

    // Set the output variable
    setOutput(outputVariable, responseData);
  } catch (error) {
    // Handle any errors
    log(
      `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
    );
    throw error;
  }
};
