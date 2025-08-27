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
  const { baseId, tableIdOrName, recordId, pageSize, offset, outputVariable } =
    inputs;

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }
  if (!tableIdOrName) {
    throw new Error('Table ID or Name is required');
  }
  if (!recordId) {
    throw new Error('Record ID is required');
  }

  // Get authentication token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  // Build URL with path parameters
  const baseUrl = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}/${encodeURIComponent(recordId)}/comments`;

  // Add query parameters if provided
  const queryParams = new URLSearchParams();
  if (pageSize) {
    queryParams.append('pageSize', pageSize.toString());
  }
  if (offset) {
    queryParams.append('offset', offset);
  }

  // Construct final URL
  const url = queryParams.toString()
    ? `${baseUrl}?${queryParams.toString()}`
    : baseUrl;

  log(`Retrieving comments for record ${recordId} from table ${tableIdOrName}`);

  try {
    // Make API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to retrieve comments: ${response.status} ${response.statusText}`;

      try {
        // Try to parse error response as JSON for more details
        const errorJson = JSON.parse(errorText);
        if (errorJson.error) {
          errorMessage += ` - ${errorJson.error.message || errorJson.error}`;
        }
      } catch (e) {
        // If parsing fails, include the raw error text
        if (errorText) {
          errorMessage += ` - ${errorText}`;
        }
      }

      throw new Error(errorMessage);
    }

    // Parse response
    const data = await response.json();

    log(`Retrieved ${data.comments?.length || 0} comments`);

    // Set output
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle network errors and other exceptions
    if (error instanceof Error) {
      throw new Error(`Error retrieving comments: ${error.message}`);
    }
    throw new Error('Unknown error occurred while retrieving comments');
  }
};
