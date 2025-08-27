export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { accessToken, accountIdentifier } = process.env;

  // Validate required environment variables
  if (!accessToken) {
    throw new Error(
      'Missing API Key. Please add your ActiveCampaign API Key in the connector settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please add your ActiveCampaign Account URL in the connector settings.',
    );
  }

  const { dealId, activityType, excludeEmail, outputVariable } = inputs;

  // Build the URL with query parameters
  let url = `${accountIdentifier}/api/3/dealActivities`;
  const queryParams = new URLSearchParams();

  // Add filters based on inputs
  if (dealId) {
    queryParams.append('deal', dealId);
    log(`Filtering by Deal ID: ${dealId}`);
  }

  if (activityType) {
    queryParams.append('filters[data_type]', activityType);
    log(`Filtering by Activity Type: ${activityType}`);
  }

  if (excludeEmail === 'true') {
    queryParams.append('exclude', 'email');
    log('Excluding email-related activities');
  }

  // Append query parameters to URL if any exist
  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }

  log('Fetching deal activities from ActiveCampaign...');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();

    if (!data.dealActivities) {
      log('No deal activities found or unexpected response format');
      setOutput(outputVariable, []);
      return;
    }

    log(`Successfully retrieved ${data.dealActivities.length} deal activities`);

    // Set the output variable with the deal activities array
    setOutput(outputVariable, data.dealActivities);
  } catch (error) {
    log(`Error fetching deal activities: ${error.message}`);
    throw error;
  }
};
