export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing Airtable authentication token');
  }

  const {
    baseId,
    tableIdOrName,
    records,
    typecast = 'false',
    returnFieldsByFieldId = 'false',
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }
  if (!tableIdOrName) {
    throw new Error('Table ID or name is required');
  }
  if (!records || !Array.isArray(records) || records.length === 0) {
    throw new Error('At least one record is required');
  }
  if (records.length > 10) {
    throw new Error('Maximum of 10 records can be updated in a single request');
  }

  // Validate each record has an id and fields
  for (const record of records) {
    if (!record.id) {
      throw new Error("Each record must have an 'id' property");
    }
    if (!record.fields || typeof record.fields !== 'object') {
      throw new Error("Each record must have a 'fields' object");
    }
  }

  log(`Updating ${records.length} record(s) in ${tableIdOrName}`);

  try {
    // Prepare request body
    const requestBody: Record<string, any> = {
      records,
    };

    // Add optional parameters if they're set to true
    if (typecast === 'true') {
      requestBody.typecast = true;
    }
    if (returnFieldsByFieldId === 'true') {
      requestBody.returnFieldsByFieldId = true;
    }

    // Make the API request
    const response = await fetch(
      `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    );

    // Handle non-successful responses
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Airtable API error (${response.status})`;

      try {
        // Try to parse error as JSON for more details
        const errorJson = JSON.parse(errorText);
        if (errorJson.error && errorJson.error.message) {
          errorMessage = `Airtable API error: ${errorJson.error.message}`;
        }
      } catch (e) {
        // If error isn't valid JSON, use the raw text
        errorMessage = `Airtable API error: ${errorText}`;
      }

      throw new Error(errorMessage);
    }

    // Parse and return the response
    const result = await response.json();
    log(`Successfully updated ${result.records.length} record(s)`);

    setOutput(outputVariable, result);
  } catch (error) {
    if (error instanceof Error) {
      // Handle rate limiting specifically
      if (
        error.message.includes('429') ||
        error.message.includes('rate limit')
      ) {
        throw new Error(
          'Airtable rate limit exceeded. Please try again later.',
        );
      }
      throw error;
    }
    throw new Error('An unknown error occurred while updating records');
  }
};
