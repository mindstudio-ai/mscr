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
    throw new Error('Missing authentication token');
  }

  const { organizationUri, count = '25', pageToken, outputVariable } = inputs;

  if (!organizationUri) {
    throw new Error('Organization URI is required');
  }

  // Extract organization UUID from URI if full URI is provided
  let organizationUuid = organizationUri;
  if (organizationUri.includes('/organizations/')) {
    organizationUuid = organizationUri.split('/organizations/')[1];
  }

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append(
    'organization',
    `https://api.calendly.com/organizations/${organizationUuid}`,
  );

  if (count) {
    queryParams.append('count', count);
  }

  if (pageToken) {
    queryParams.append('page_token', pageToken);
  }

  log(
    `Fetching organization invitations for organization: ${organizationUuid}`,
  );

  try {
    const response = await fetch(
      `https://api.calendly.com/organization_invitations?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch organization invitations: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const data = (await response.json()) as any;

    log(
      `Successfully retrieved ${data.collection.length} organization invitations`,
    );

    // Include pagination information in the output
    setOutput(outputVariable, {
      collection: data.collection,
      pagination: data.pagination,
    });
  } catch (error) {
    if (error instanceof Error) {
      // Handle rate limiting specifically
      if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw error;
    }
    throw new Error(
      'An unknown error occurred while fetching organization invitations',
    );
  }
};
