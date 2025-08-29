export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract the bearer token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Calendly connection.',
    );
  }

  // Extract inputs
  const { organizationUri, status, sort, pageSize, pageToken, outputVariable } =
    inputs;

  // Validate required inputs
  if (!organizationUri) {
    throw new Error('Organization URI is required');
  }

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('organization', organizationUri);

  if (status && status !== 'all') {
    queryParams.append('status', status);
  }

  if (sort) {
    queryParams.append('sort', sort);
  }

  if (pageSize) {
    queryParams.append('count', pageSize);
  }

  if (pageToken) {
    queryParams.append('page_token', pageToken);
  }

  // Construct the request URL
  const url = `https://api.calendly.com/outgoing_communications?${queryParams.toString()}`;

  log(`Fetching outgoing communications from Calendly...`);

  try {
    // Make the API request
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

      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Calendly connection.',
        );
      } else if (response.status === 403) {
        throw new Error(
          "You don't have permission to access these communications.",
        );
      } else if (response.status === 404) {
        throw new Error('The specified organization was not found.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Calendly API error (${response.status}): ${errorText}`,
        );
      }
    }

    // Parse the response
    const data = (await response.json()) as any;

    log(
      `Successfully retrieved ${data.collection?.length || 0} communications`,
    );

    // Set the output variable
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
