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
      'Missing API Key. Please add your Beehiiv API key in the service configuration.',
    );
  }

  // Extract inputs
  const {
    publicationId,
    audience = 'all',
    platform = 'all',
    status = 'all',
    contentTags = '',
    hiddenFromFeed = 'all',
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('audience', audience);
  queryParams.append('platform', platform);
  queryParams.append('status', status);
  queryParams.append('hidden_from_feed', hiddenFromFeed);

  // Add content tags if provided
  if (contentTags) {
    const tags = contentTags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    tags.forEach((tag) => {
      queryParams.append('content_tags[]', tag);
    });
  }

  // Construct the API URL
  const apiUrl = `https://api.beehiiv.com/v2/publications/${publicationId}/posts/aggregate_stats?${queryParams.toString()}`;

  log(`Fetching aggregate stats for publication ${publicationId}...`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    log('Successfully retrieved aggregate stats');

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors
    log(
      `Error fetching aggregate stats: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
