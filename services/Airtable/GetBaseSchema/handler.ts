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
  const { baseId, includeVisibleFieldIds, outputVariable } = inputs;
  const token = process.env.token;

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }

  if (!token) {
    throw new Error('Authentication token is missing');
  }

  // Construct API URL
  let url = `https://api.airtable.com/v0/meta/bases/${baseId}/tables`;

  // Add query parameters if includeVisibleFieldIds is true
  if (includeVisibleFieldIds === 'true') {
    url += '?include[]=visibleFieldIds';
  }

  log(`Fetching schema for base: ${baseId}`);

  try {
    // Make request to Airtable API
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle API errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Airtable API error (${response.status}): ${errorText}`);
    }

    // Parse response
    const data = await response.json();

    log(
      `Successfully retrieved schema with ${data.tables?.length || 0} tables`,
    );

    // Set output variable with the parsed response
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle and log errors
    log(`Error fetching base schema: ${error.message}`);
    throw error;
  }
};
