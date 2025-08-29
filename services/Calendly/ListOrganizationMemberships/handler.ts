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

  const { organizationUuid, count, pageToken, outputVariable } = inputs;

  if (!organizationUuid) {
    throw new Error('Organization UUID is required');
  }

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('organization', organizationUuid);

  if (count) {
    queryParams.append('count', count);
  }

  if (pageToken) {
    queryParams.append('page_token', pageToken);
  }

  log(`Fetching organization memberships for organization ${organizationUuid}`);

  try {
    const response = await fetch(
      `https://api.calendly.com/organization_memberships?${queryParams.toString()}`,
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
        `Failed to fetch organization memberships: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const data = (await response.json()) as any;

    log(
      `Successfully retrieved ${data.collection.length} organization memberships`,
    );

    // Set the output variable with the complete response
    setOutput(outputVariable, data);
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
