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
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const { publicationId, page = '1', limit = '10', outputVariable } = inputs;

  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  // Validate publication ID format
  if (!publicationId.startsWith('pub_')) {
    log('Warning: Publication ID should typically start with "pub_"');
  }

  // Construct URL with optional query parameters
  const queryParams = new URLSearchParams();
  if (page) {
    queryParams.append('page', page);
  }
  if (limit) {
    queryParams.append('limit', limit);
  }

  const queryString = queryParams.toString();
  const url = `https://api.beehiiv.com/v2/publications/${publicationId}/custom_fields${queryString ? `?${queryString}` : ''}`;

  log(`Fetching custom fields for publication: ${publicationId}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 404) {
        throw new Error(
          `Publication not found. Please check your Publication ID (${publicationId}).`,
        );
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else if (response.status === 400) {
        throw new Error(`Bad request: ${errorText}`);
      } else {
        throw new Error(
          `API request failed with status ${response.status}: ${errorText}`,
        );
      }
    }

    // Parse the response
    const data = await response.json();

    // Log success with summary of results
    const totalFields = data.data?.length || 0;
    log(
      `Successfully retrieved ${totalFields} custom fields (page ${data.page || 1} of ${data.total_pages || 1})`,
    );

    // Set the output variable
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      throw new Error(`Failed to fetch custom fields: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching custom fields');
    }
  }
};
