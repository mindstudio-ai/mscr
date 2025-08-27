export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract environment variables
  const accessToken = process.env.accessToken;
  const accountIdentifier = process.env.accountIdentifier;

  // Validate required environment variables
  if (!accessToken) {
    throw new Error(
      'Missing API Key. Please check your ActiveCampaign API Key in the connector settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please check your ActiveCampaign Account URL in the connector settings.',
    );
  }

  // Extract input variables
  const { outputVariable } = inputs;

  // Remove trailing slash from account identifier if present
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the request URL
  const url = `${baseUrl}/api/3/import/bulk_import`;

  log('Retrieving bulk import status from ActiveCampaign...');

  try {
    // Make the request to the ActiveCampaign API
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Api-Token': accessToken,
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to retrieve bulk import status: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    // Log the results
    const outstandingCount = data.outstanding?.length || 0;
    const completedCount = data.recentlyCompleted?.length || 0;

    log(
      `Successfully retrieved bulk import status. Found ${outstandingCount} outstanding and ${completedCount} recently completed imports.`,
    );

    // Set the output variable with the result
    setOutput(outputVariable, {
      outstanding: data.outstanding || [],
      recentlyCompleted: data.recentlyCompleted || [],
    });
  } catch (error) {
    // Handle any errors that occurred during the request
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
