export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API key in the connector settings.',
    );
  }

  // Extract and validate inputs
  const {
    leadProfileUrl,
    leadLinkedInId,
    tags,
    createTagIfNotExisting,
    outputVariable,
  } = inputs;

  // Validate that at least one identifier is provided
  if (!leadProfileUrl && !leadLinkedInId) {
    throw new Error(
      'Either LinkedIn Profile URL or LinkedIn ID must be provided',
    );
  }

  // Parse tags from comma-separated string to array
  const tagArray = tags
    .split(',')
    .map((tag: string) => tag.trim())
    .filter((tag: string) => tag);

  if (tagArray.length === 0) {
    throw new Error('At least one tag must be provided');
  }

  // Convert createTagIfNotExisting string to boolean
  const createTagsIfNotExist = createTagIfNotExisting === 'true';

  // Prepare request body
  const requestBody = {
    leadProfileUrl: leadProfileUrl || undefined,
    leadLinkedInId: leadLinkedInId || undefined,
    tags: tagArray,
    createTagIfNotExisting: createTagsIfNotExist,
  };

  log(
    `Replacing tags for lead${leadProfileUrl ? ` with profile URL: ${leadProfileUrl}` : ` with LinkedIn ID: ${leadLinkedInId}`}`,
  );
  log(`New tags: ${tagArray.join(', ')}`);

  try {
    // Make API request to HeyReach
    const response = await fetch(
      'https://api.heyreach.io/api/public/lead/ReplaceTags',
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

    const responseData = await response.json();
    log(
      `Successfully replaced tags. New assigned tags: ${responseData.newAssignedTags.join(', ')}`,
    );

    // Set output variable with the response data
    setOutput(outputVariable, responseData);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error replacing tags: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while replacing tags');
  }
};
