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
  const { baseId, tableIdOrName, recordId, outputVariable } = inputs;

  // Get token from environment variables
  const token = process.env.token;
  if (!token) {
    throw new Error(
      'Airtable authentication token is missing. Please check your configuration.',
    );
  }

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }
  if (!tableIdOrName) {
    throw new Error('Table name or ID is required');
  }
  if (!recordId) {
    throw new Error('Record ID is required');
  }

  // Construct the API URL
  const url = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}/${encodeURIComponent(recordId)}`;

  log(`Deleting record ${recordId} from table ${tableIdOrName}`);

  try {
    // Make the DELETE request to Airtable API
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to delete record. Status: ${response.status}`;

      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error && errorJson.error.message) {
          errorMessage = `Airtable error: ${errorJson.error.message}`;
        }
      } catch (e) {
        // If parsing fails, use the raw error text
        if (errorText) {
          errorMessage += ` - ${errorText}`;
        }
      }

      // Handle specific error codes
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Airtable token.',
        );
      } else if (response.status === 403) {
        throw new Error("You don't have permission to delete this record.");
      } else if (response.status === 404) {
        throw new Error(
          'Record not found. Please check your Base ID, Table Name, and Record ID.',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(errorMessage);
      }
    }

    // Parse the response
    const data = await response.json();

    log(`Successfully deleted record ${recordId}`);

    // Set the output variable with the deletion result
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`An unexpected error occurred: ${error}`);
    }
  }
};
