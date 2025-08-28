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
  // Get API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API Key in the connector settings.',
    );
  }

  // Extract inputs
  const {
    campaignId,
    offset,
    limit,
    timeFilter,
    timeFrom,
    timeTo,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  // Validate time filter inputs
  if (timeFilter === 'CreationTime' && (!timeFrom || !timeTo)) {
    throw new Error(
      'Both timeFrom and timeTo are required when using CreationTime filter',
    );
  }

  // Prepare request payload
  const payload: Record<string, any> = {
    campaignId: Number(campaignId),
    offset: Number(offset),
    limit: Number(limit),
    timeFilter,
  };

  // Add time range parameters if using CreationTime filter
  if (timeFilter === 'CreationTime') {
    payload.timeFrom = timeFrom;
    payload.timeTo = timeTo;
  }

  log(`Retrieving leads from campaign ID: ${campaignId}`);

  try {
    // Make request to HeyReach API
    const response = await fetch(
      'https://api.heyreach.io/api/public/campaign/GetLeadsFromCampaign',
      {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          Accept: 'text/plain',
        },
        body: JSON.stringify(payload),
      },
    );

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HeyReach API returned an error: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse response
    const data = await response.json();

    log(
      `Successfully retrieved ${data.items?.length || 0} leads out of ${data.totalCount || 0} total leads`,
    );

    // Set output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle and log errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error retrieving campaign leads: ${errorMessage}`);
    throw error;
  }
};
