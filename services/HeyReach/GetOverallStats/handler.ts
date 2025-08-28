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
      'Missing API Key. Please configure your HeyReach API Key in the connector settings.',
    );
  }

  const { startDate, endDate, accountIds, campaignIds, outputVariable } =
    inputs;

  // Format dates with time components
  const formattedStartDate = `${startDate}T00:00:00.000Z`;
  const formattedEndDate = `${endDate}T23:59:59.999Z`;

  // Parse account IDs if provided
  let parsedAccountIds: number[] = [];
  if (accountIds && accountIds.trim() !== '') {
    parsedAccountIds = accountIds
      .split(',')
      .map((id: string) => parseInt(id.trim(), 10))
      .filter((id: number) => !isNaN(id));
  }

  // Parse campaign IDs if provided
  let parsedCampaignIds: number[] = [];
  if (campaignIds && campaignIds.trim() !== '') {
    parsedCampaignIds = campaignIds
      .split(',')
      .map((id: string) => parseInt(id.trim(), 10))
      .filter((id: number) => !isNaN(id));
  }

  // Prepare request body
  const requestBody = {
    accountIds: parsedAccountIds,
    campaignIds: parsedCampaignIds,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  };

  log(`Fetching HeyReach stats from ${startDate} to ${endDate}`);
  if (parsedAccountIds.length > 0) {
    log(`Filtering by ${parsedAccountIds.length} account(s)`);
  }
  if (parsedCampaignIds.length > 0) {
    log(`Filtering by ${parsedCampaignIds.length} campaign(s)`);
  }

  try {
    const response = await fetch(
      'https://api.heyreach.io/api/public/stats/GetOverallStats',
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

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HeyReach API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    log('Successfully retrieved stats data');

    // Set the output variable with the complete response
    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error fetching stats: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
