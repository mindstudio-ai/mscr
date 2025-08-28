import mailchimp from '@mailchimp/mailchimp_marketing';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Extract inputs
  const { listId, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the connector settings.',
    );
  }

  // Validate required inputs
  if (!listId) {
    throw new Error(
      'Missing List ID. Please provide a valid MailChimp list ID.',
    );
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey: apiKey,
    server: serverPrefix,
  });

  try {
    // Log the operation
    log(`Retrieving surveys for list ID: ${listId}`);

    // Make the API call to get surveys for the list
    const response = await mailchimp.lists.getListSurveys(listId);

    // Log success
    log(`Successfully retrieved surveys for list ID: ${listId}`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    } else {
      throw new Error(
        `Error retrieving surveys: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
