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
      'Missing API Key. Please configure your HeyReach API key in the connector settings.',
    );
  }

  // Extract inputs
  const { email, linkedinId, profileUrl, offset, limit, outputVariable } =
    inputs;

  // Validate that at least one lead identifier is provided
  if (!email && !linkedinId && !profileUrl) {
    throw new Error(
      'At least one lead identifier (email, LinkedIn ID, or profile URL) must be provided',
    );
  }

  // Prepare request body
  const requestBody = {
    email: email || '',
    linkedinId: linkedinId || '',
    profileUrl: profileUrl || '',
    offset: parseInt(offset || '0', 10),
    limit: parseInt(limit || '100', 10),
  };

  // Log the action being performed
  log('Retrieving lists for lead...');

  // Determine which identifier is being used for logging purposes
  const identifierUsed = email
    ? `email: ${email}`
    : linkedinId
      ? `LinkedIn ID: ${linkedinId}`
      : `LinkedIn profile: ${profileUrl}`;

  log(`Using ${identifierUsed} to find associated lists`);

  try {
    // Make request to HeyReach API
    const response = await fetch(
      'https://api.heyreach.io/api/public/list/GetListsForLead',
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

    // Check if response is successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HeyReach API error (${response.status}): ${errorText}`);
    }

    // Parse response
    const data = await response.json();

    // Log results
    if (data.totalCount === 0) {
      log('No lists found for this lead');
    } else {
      log(`Found ${data.totalCount} list(s) associated with the lead`);
    }

    // Set output variable
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while contacting HeyReach API');
  }
};
