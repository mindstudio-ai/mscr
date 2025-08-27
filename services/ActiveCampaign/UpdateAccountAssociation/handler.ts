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
  const { accessToken, accountIdentifier } = process.env;

  // Validate environment variables
  if (!accessToken) {
    throw new Error(
      'Missing API Key. Please configure your ActiveCampaign API Key in the connector settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please configure your ActiveCampaign Base Account URL in the connector settings.',
    );
  }

  // Extract inputs
  const { associationId, jobTitle, outputVariable } = inputs;

  // Validate required inputs
  if (!associationId) {
    throw new Error('Association ID is required');
  }

  if (!jobTitle) {
    throw new Error('Job Title is required');
  }

  // Ensure the accountIdentifier doesn't end with a slash
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the API URL
  const url = `${baseUrl}/api/3/accountContacts/${associationId}`;

  // Prepare the request body
  const requestBody = {
    accountContact: {
      jobTitle,
    },
  };

  log(`Updating association ${associationId} with job title: ${jobTitle}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Parse the response
    const responseData = await response.json();

    // Check for errors
    if (!response.ok) {
      const errorMessage =
        responseData.message ||
        `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    log('Successfully updated account association');

    // Set the output variable
    setOutput(outputVariable, responseData);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error(
          `Association with ID ${associationId} not found. Please check the ID and try again.`,
        );
      } else if (error.message.includes('401')) {
        throw new Error(
          'Authentication failed. Please check your API Key and try again.',
        );
      } else {
        throw new Error(
          `Failed to update account association: ${error.message}`,
        );
      }
    } else {
      throw new Error(
        'An unknown error occurred while updating the account association',
      );
    }
  }
};
