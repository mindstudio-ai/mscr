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
  const { baseName, workspaceId, tables, outputVariable } = inputs;

  // Validate required environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Airtable connection.',
    );
  }

  // Validate required inputs
  if (!baseName) {
    throw new Error('Base name is required');
  }

  if (!workspaceId) {
    throw new Error('Workspace ID is required');
  }

  if (!tables || tables.length === 0) {
    throw new Error('At least one table with at least one field is required');
  }

  // Prepare request payload
  const payload = {
    name: baseName,
    workspaceId,
    tables,
  };

  log(
    `Creating new Airtable base "${baseName}" in workspace ${workspaceId}...`,
  );
  log(`Setting up ${tables.length} table(s)...`);

  try {
    // Make API request to create the base
    const response = await fetch('https://api.airtable.com/v0/meta/bases', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to create base. Status: ${response.status}`;

      try {
        // Try to parse error as JSON for more details
        const errorJson = JSON.parse(errorText);
        if (errorJson.error) {
          errorMessage += ` - ${errorJson.error.message || errorJson.error}`;
        }
      } catch (e) {
        // If error isn't JSON, use the raw text
        if (errorText) {
          errorMessage += ` - ${errorText}`;
        }
      }

      throw new Error(errorMessage);
    }

    // Parse successful response
    const result = await response.json();

    log(`Successfully created base "${baseName}" with ID: ${result.id}`);
    log(`Created ${result.tables.length} table(s)`);

    // Output the result
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle and rethrow errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while creating the base');
  }
};
