export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API Key in the service settings.',
    );
  }

  const { campaignId, leadMemberId, leadUrl, outputVariable } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }
  if (!leadMemberId) {
    throw new Error('Lead Member ID is required');
  }
  if (!leadUrl) {
    throw new Error('Lead URL is required');
  }

  log(`Stopping lead with ID ${leadMemberId} in campaign ${campaignId}...`);

  try {
    // Prepare request body
    const requestBody = {
      campaignId: parseInt(campaignId, 10),
      leadMemberId,
      leadUrl,
    };

    // Make the API request
    const response = await fetch(
      'https://api.heyreach.io/api/public/campaign/StopLeadInCampaign',
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

    // Handle different response statuses
    if (response.ok) {
      log('Successfully stopped lead in campaign');
      setOutput(outputVariable, {
        success: true,
        message: 'Lead successfully stopped in campaign',
      });
      return;
    }

    // Handle error responses
    let errorData: { errorMessage?: string } = {};
    try {
      errorData = await response.json();
    } catch (e) {
      // If response is not JSON, use status text
    }

    const errorMessage = errorData.errorMessage || response.statusText;

    switch (response.status) {
      case 400:
        throw new Error(`Bad request: ${errorMessage}`);
      case 401:
        throw new Error('Unauthorized: Invalid API key');
      case 404:
        throw new Error(`Not found: ${errorMessage}`);
      case 429:
        throw new Error('Too many requests. Please try again later.');
      default:
        throw new Error(
          `Error stopping lead: ${errorMessage} (Status: ${response.status})`,
        );
    }
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
