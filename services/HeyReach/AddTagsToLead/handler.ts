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
  const {
    leadProfileUrl,
    leadLinkedInId,
    tags,
    createTagIfNotExisting,
    outputVariable,
  } = inputs;

  // Validate that at least one lead identifier is provided
  if (!leadProfileUrl && !leadLinkedInId) {
    throw new Error(
      'You must provide either a LinkedIn Profile URL or LinkedIn ID to identify the lead.',
    );
  }

  // Parse tags from comma-separated string to array
  const tagArray = tags
    .split(',')
    .map((tag: string) => tag.trim())
    .filter((tag: string) => tag.length > 0);

  if (tagArray.length === 0) {
    throw new Error('At least one tag must be provided.');
  }

  // Prepare request body
  const requestBody = {
    leadProfileUrl: leadProfileUrl || undefined,
    leadLinkedInId: leadLinkedInId || undefined,
    tags: tagArray,
    createTagIfNotExisting: createTagIfNotExisting === 'true',
  };

  log(
    `Adding ${tagArray.length} tags to lead${leadProfileUrl ? ` with profile URL: ${leadProfileUrl}` : ''}`,
  );

  try {
    // Make API request to HeyReach
    const response = await fetch(
      'https://api.heyreach.io/api/public/lead/AddTags',
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

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HeyReach API error (${response.status}): ${errorText}`);
    }

    const result = await response.json();

    log(
      `Successfully added tags to lead. ${result.newAssignedTags?.length || 0} new tags were assigned.`,
    );

    // Set output variable with the result
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error adding tags to lead: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while adding tags to lead');
  }
};
