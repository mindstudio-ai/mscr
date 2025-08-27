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
  // Get environment variables
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

  // Extract inputs
  const {
    contacts,
    excludeAutomations,
    callbackUrl,
    callbackRequestType,
    detailedResults,
    outputVariable,
  } = inputs;

  // Validate contacts
  if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
    throw new Error('At least one contact is required for import');
  }

  if (contacts.length > 250) {
    throw new Error('Maximum of 250 contacts allowed per import');
  }

  // Prepare request payload
  const payload: Record<string, any> = {
    contacts,
  };

  // Add exclude_automations if true
  if (excludeAutomations === 'true') {
    payload.exclude_automations = true;
  }

  // Add callback if URL is provided
  if (callbackUrl) {
    payload.callback = {
      url: callbackUrl,
      requestType: callbackRequestType || 'POST',
    };

    if (detailedResults) {
      payload.callback.detailed_results = detailedResults;
    }
  }

  // Check payload size
  const payloadString = JSON.stringify(payload);
  if (payloadString.length > 399999) {
    throw new Error('Payload size exceeds the maximum limit of 400K bytes');
  }

  // Prepare API URL
  let apiUrl = accountIdentifier;
  if (!apiUrl.endsWith('/')) {
    apiUrl += '/';
  }
  apiUrl += 'api/3/import/bulk_import';

  log(`Importing ${contacts.length} contact(s) to ActiveCampaign...`);

  try {
    // Make API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': accessToken,
      },
      body: payloadString,
    });

    // Handle response
    if (!response.ok) {
      const errorData = await response.json();

      // Format error message based on response structure
      let errorMessage = 'Import failed: ';

      if (errorData.failureReasons) {
        if (
          Array.isArray(errorData.failureReasons) &&
          typeof errorData.failureReasons[0] === 'string'
        ) {
          // General errors
          errorMessage += errorData.failureReasons.join(', ');
        } else {
          // Contact-specific errors
          errorMessage +=
            'There were errors with some contacts. See details in the error response.';
        }
      } else {
        errorMessage += response.statusText || 'Unknown error';
      }

      throw new Error(errorMessage);
    }

    // Parse successful response
    const result = await response.json();

    log(
      `Import successful: ${result.success} contact(s) processed, ${result.queued_contacts} queued. Batch ID: ${result.batchId}`,
    );

    // Set output
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle network or other errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred during the import process');
  }
};
