export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract inputs and environment variables
  const { contactId, outputVariable } = inputs;
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

  // Validate required inputs
  if (!contactId) {
    throw new Error('Contact ID is required.');
  }

  // Construct the API URL
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const url = `${baseUrl}/api/3/contacts/${contactId}/contactGoals`;

  log(`Retrieving goals for contact ID: ${contactId}`);

  try {
    // Make the API request
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
        `Failed to retrieve contact goals: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    log(
      `Successfully retrieved ${data.contactGoals?.length || 0} goals for the contact`,
    );

    // Set the output variable with the contact goals data
    setOutput(outputVariable, data.contactGoals || []);
  } catch (error) {
    // Handle any errors that occurred during the request
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
