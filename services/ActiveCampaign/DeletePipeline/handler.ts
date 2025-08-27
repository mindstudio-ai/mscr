export const handler = async ({
  inputs,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Get environment variables
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

  // Get inputs
  const { pipelineId, confirmDelete } = inputs;

  // Validate inputs
  if (!pipelineId) {
    throw new Error('Pipeline ID is required');
  }

  // Safety check - require explicit confirmation
  if (confirmDelete !== 'yes') {
    throw new Error(
      "Pipeline deletion was not confirmed. Please select 'Yes' to confirm deletion.",
    );
  }

  // Construct the API URL
  const apiUrl = `${accountIdentifier}/api/3/dealGroups/${pipelineId}`;

  log(`Preparing to delete pipeline with ID: ${pipelineId}`);
  log(
    'Warning: This will delete all stages and deals associated with this pipeline',
  );

  try {
    // Make the DELETE request
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Api-Token': accessToken,
        Accept: 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      // Try to get error details from the response
      let errorDetails = '';
      try {
        const errorData = await response.json();
        errorDetails = JSON.stringify(errorData);
      } catch (e) {
        // If we can't parse the error response, use the status text
        errorDetails = response.statusText;
      }

      throw new Error(
        `Failed to delete pipeline. Status: ${response.status}. Details: ${errorDetails}`,
      );
    }

    log(`Successfully deleted pipeline with ID: ${pipelineId}`);
  } catch (error) {
    // Handle network errors or other exceptions
    if (error instanceof Error) {
      throw new Error(`Error deleting pipeline: ${error.message}`);
    } else {
      throw new Error(`Unknown error occurred while deleting pipeline`);
    }
  }
};
