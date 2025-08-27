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
      'Missing API Key. Please check your ActiveCampaign connection settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please check your ActiveCampaign connection settings.',
    );
  }

  // Extract inputs
  const { contactId, afterDate, sortOrder, includeEmails, outputVariable } =
    inputs;

  // Validate required inputs
  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  // Normalize the account identifier URL
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Build the API URL
  const apiUrl = new URL(`${baseUrl}/api/3/activities`);

  // Add required query parameters
  apiUrl.searchParams.append('contact', contactId);

  // Add optional query parameters if provided
  if (afterDate) {
    apiUrl.searchParams.append('after', afterDate);
  }

  if (sortOrder) {
    apiUrl.searchParams.append('orders[tstamp]', sortOrder);
  }

  if (includeEmails) {
    apiUrl.searchParams.append('emails', includeEmails);
  }

  // Include common activity types and related data
  const includeParams = [
    'activities',
    'notes',
    'notes.user',
    'recipients',
    'recipients.recipient',
    'reference',
    'reference.automation',
    'reference.campaign',
    'reference.contact',
    'reference.list',
    'reference.log',
    'reference.message',
    'reference.note',
  ].join(',');

  apiUrl.searchParams.append('include', includeParams);

  log(`Retrieving activities for contact ID: ${contactId}`);

  try {
    // Make the API request
    const response = await fetch(apiUrl.toString(), {
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

    log(`Successfully retrieved ${data.activities?.length || 0} activities`);

    // Set the output variable
    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error retrieving contact activities: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
