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

  // Validate environment variables
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

  const { pipelineId, outputVariable } = inputs;

  // Validate inputs
  if (!pipelineId) {
    throw new Error('Pipeline ID is required');
  }

  // Format the base URL correctly
  let baseUrl = accountIdentifier;
  if (!baseUrl.startsWith('http')) {
    baseUrl = `https://${baseUrl}`;
  }
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
  }

  const url = `${baseUrl}/api/3/dealGroups/${pipelineId}`;

  log(`Retrieving pipeline with ID: ${pipelineId}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Api-Token': accessToken,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to retrieve pipeline: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const data = await response.json();
    log(
      `Successfully retrieved pipeline: ${data.dealGroup?.title || 'Unknown'}`,
    );

    // Set the entire response as the output
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving pipeline: ${error.message}`);
    }
    throw new Error(`Unknown error occurred while retrieving pipeline`);
  }
};
