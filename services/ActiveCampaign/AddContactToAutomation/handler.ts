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
      'Missing API Key. Please add your ActiveCampaign API Key in the connector settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please add your ActiveCampaign Account URL in the connector settings.',
    );
  }

  // Extract inputs
  const { contactId, automationId, outputVariable } = inputs;

  // Validate required inputs
  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  if (!automationId) {
    throw new Error('Automation ID is required');
  }

  // Prepare the request URL
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const url = `${baseUrl}/api/3/contactAutomations`;

  // Log the operation
  log(`Adding contact ${contactId} to automation ${automationId}...`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        contactAutomation: {
          contact: contactId,
          automation: automationId,
        },
      }),
    });

    // Get the response data
    const data = await response.json();

    // Check for errors
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          'Authentication failed. Please check your API Key and Account URL.',
        );
      }

      const errorMessage =
        data.message || `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    // Log success
    log(`Successfully added contact to automation`);

    // Set the output
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error: ${errorMessage}`);
    throw error;
  }
};
