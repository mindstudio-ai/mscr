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
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API key in the connector settings.',
    );
  }

  // Extract inputs
  const { email, linkedinId, profileUrl, offset, limit, outputVariable } =
    inputs;

  // Validate that at least one lead identifier is provided
  if (!email && !linkedinId && !profileUrl) {
    throw new Error(
      'At least one lead identifier (email, LinkedIn ID, or profile URL) must be provided.',
    );
  }

  // Prepare request body
  const requestBody = {
    email: email || undefined,
    linkedinId: linkedinId || undefined,
    profileUrl: profileUrl || undefined,
    offset: parseInt(offset || '0', 10),
    limit: parseInt(limit || '100', 10),
  };

  // Log the search criteria
  const identifiers = [];
  if (email) {
    identifiers.push(`email: ${email}`);
  }
  if (linkedinId) {
    identifiers.push(`LinkedIn ID: ${linkedinId}`);
  }
  if (profileUrl) {
    identifiers.push(`profile URL: ${profileUrl}`);
  }

  log(`Searching for campaigns with lead ${identifiers.join(', ')}`);

  try {
    // Make the API request
    const response = await fetch(
      'https://api.heyreach.io/api/public/campaign/GetCampaignsForLead',
      {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          Accept: 'text/plain',
        },
        body: JSON.stringify(requestBody),
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    // Log the results
    if (data.totalCount > 0) {
      log(
        `Found ${data.totalCount} campaign(s) for lead ${data.leadFullName || 'unknown'}`,
      );
    } else {
      log('No campaigns found for the specified lead');
    }

    // Set the output
    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error retrieving campaigns: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
