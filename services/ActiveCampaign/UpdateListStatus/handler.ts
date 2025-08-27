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
  const { contactId, listId, status, sourceId = '0', outputVariable } = inputs;

  // Validate required inputs
  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!status) {
    throw new Error('Status is required');
  }

  // Construct API URL
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;
  const apiUrl = `${baseUrl}/api/3/contactLists`;

  // Create request payload
  const payload = {
    contactList: {
      list: listId,
      contact: contactId,
      status: status,
      sourceid: sourceId,
    },
  };

  // Log the operation being performed
  const statusText = status === '1' ? 'subscribing' : 'unsubscribing';
  log(
    `${statusText} contact ${contactId} ${status === '1' ? 'to' : 'from'} list ${listId}...`,
  );

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Parse the response
    const responseData = await response.json();

    // Check for errors
    if (!response.ok) {
      const errorMessage =
        responseData.message ||
        'An error occurred while updating the contact list status';
      throw new Error(`API Error (${response.status}): ${errorMessage}`);
    }

    // Log success message
    log(
      `Successfully ${status === '1' ? 'subscribed' : 'unsubscribed'} contact ${contactId} ${status === '1' ? 'to' : 'from'} list ${listId}`,
    );

    // Set the output
    setOutput(outputVariable, responseData);
  } catch (error) {
    // Handle errors
    log(`Error: ${error.message}`);
    throw error;
  }
};
