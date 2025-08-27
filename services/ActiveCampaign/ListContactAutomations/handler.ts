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
  const { contactId, outputVariable } = inputs;

  // Validate required inputs
  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  // Normalize account identifier by removing trailing slash if present
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct API endpoint URL with contact filter
  const apiUrl = `${baseUrl}/api/3/contactAutomations?filters[contact]=${contactId}`;

  log(`Retrieving automations for contact ID: ${contactId}`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
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
        `ActiveCampaign API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    // Log success message with count of automations found
    const automationCount = data.contactAutomations?.length || 0;
    log(
      `Successfully retrieved ${automationCount} automation${automationCount !== 1 ? 's' : ''} for contact ID: ${contactId}`,
    );

    // Set the output variable with the complete response
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    log(
      `Error retrieving contact automations: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
