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

  const { batchId, outputVariable } = inputs;

  // Validate required inputs
  if (!batchId) {
    throw new Error(
      'Missing Batch ID. Please provide a valid batch ID to check the import status.',
    );
  }

  // Ensure the account identifier doesn't end with a slash
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the API URL
  const apiUrl = `${baseUrl}/api/3/import?batchId=${batchId}`;

  log(`Checking status of bulk import batch: ${batchId}`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Api-Token': accessToken,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();

    // Log appropriate message based on status
    if (data.status === 'completed') {
      log(
        `Import completed successfully with ${data.success?.length || 0} contacts imported and ${data.failure?.length || 0} failures.`,
      );
    } else if (
      data.status === 'waiting' ||
      data.status === 'claimed' ||
      data.status === 'active'
    ) {
      log(`Import is still in progress. Current status: ${data.status}`);
    } else if (data.status === 'failed' || data.status === 'interrupted') {
      log(`Import failed or was interrupted. Status: ${data.status}`);
    } else {
      log(`Import status: ${data.status}`);
    }

    // Set the output variable with the full response
    setOutput(outputVariable, {
      status: data.status,
      success: data.success || [],
      failure: data.failure || [],
    });
  } catch (error) {
    // Handle any errors that occurred during the request
    log(
      `Error checking import status: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
