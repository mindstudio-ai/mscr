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
      'Missing API Key. Please check your ActiveCampaign connection settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please check your ActiveCampaign connection settings.',
    );
  }

  const { filterTitle, haveStages, orderTitle, orderPopular, outputVariable } =
    inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (filterTitle) {
    queryParams.append('filters[title]', filterTitle);
  }

  if (haveStages) {
    queryParams.append('filters[have_stages]', haveStages);
  }

  if (orderTitle) {
    queryParams.append('orders[title]', orderTitle);
  }

  if (orderPopular) {
    queryParams.append('orders[popular]', orderPopular);
  }

  // Construct the API URL
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const apiUrl = `${baseUrl}/api/3/dealGroups${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  log('Fetching pipelines from ActiveCampaign...');

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Api-Token': accessToken,
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

    if (!data.dealGroups) {
      throw new Error(
        'Unexpected API response format: missing dealGroups property',
      );
    }

    // Process the pipelines to include their stages
    const pipelines = data.dealGroups.map((pipeline: any) => {
      // Find the stages that belong to this pipeline
      const pipelineStages = pipeline.stages
        ? pipeline.stages
            .map((stageId: string) => {
              return data.dealStages.find((stage: any) => stage.id === stageId);
            })
            .filter(Boolean)
        : [];

      return {
        ...pipeline,
        stageDetails: pipelineStages,
      };
    });

    log(`Successfully retrieved ${pipelines.length} pipelines`);
    setOutput(outputVariable, pipelines);
  } catch (error) {
    log(
      `Error fetching pipelines: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
