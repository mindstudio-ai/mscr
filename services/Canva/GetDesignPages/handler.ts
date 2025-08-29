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
  const { designId, offset, limit, outputVariable } = inputs;

  // Validate required inputs
  if (!designId) {
    throw new Error('Design ID is required');
  }

  // Get the bearer token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing authentication token');
  }

  // Construct the API URL with query parameters
  let url = `https://api.canva.com/rest/v1/designs/${designId}/pages`;

  // Add optional query parameters if provided
  const queryParams = new URLSearchParams();
  if (offset) {
    queryParams.append('offset', offset);
  }
  if (limit) {
    queryParams.append('limit', limit);
  }

  // Append query parameters to URL if any exist
  const queryString = queryParams.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  log(`Retrieving pages for design ${designId}...`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to retrieve design pages: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse the response
    const data = (await response.json()) as any;

    // Log success and page count
    const pageCount = data.items?.length || 0;
    log(
      `Successfully retrieved ${pageCount} page${pageCount === 1 ? '' : 's'} from the design`,
    );

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
