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
  // Extract environment variables
  const { accessToken, accountIdentifier } = process.env;

  // Validate required environment variables
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

  // Extract inputs
  const { titleFilter, pipelineId, orderByTitle, outputVariable } = inputs;

  // Build the API URL with query parameters
  let apiUrl = `${accountIdentifier}/api/3/dealStages`;

  // Add query parameters if provided
  const queryParams = new URLSearchParams();

  if (titleFilter) {
    queryParams.append('filters[title]', titleFilter);
  }

  if (pipelineId) {
    queryParams.append('filters[d_groupid]', pipelineId);
  }

  if (orderByTitle) {
    queryParams.append('orders[title]', orderByTitle);
  }

  // Append query parameters to URL if any exist
  const queryString = queryParams.toString();
  if (queryString) {
    apiUrl += `?${queryString}`;
  }

  log(`Fetching deal stages from ActiveCampaign...`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    // Extract the deal stages from the response
    const dealStages = data.dealStages || [];

    log(`Successfully retrieved ${dealStages.length} deal stages`);

    // Set the output variable with the deal stages
    setOutput(outputVariable, dealStages);
  } catch (error) {
    // Handle any errors
    log(`Error fetching deal stages: ${error.message}`);
    throw error;
  }
};
