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
  const { surveyId, responseId, outputVariable } = inputs;

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

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    // Log the operation being performed
    log(`Retrieving survey response ${responseId} from survey ${surveyId}...`);

    // Make the API request to get the survey response
    // Note: The Mailchimp API client doesn't have a direct method for this endpoint in the type definitions,
    // so we need to use the request method to access it
    const response = await mailchimp.request({
      method: 'GET',
      path: `/reporting/surveys/${surveyId}/responses/${responseId}`,
    });

    // Log success
    log(`Successfully retrieved survey response data`);

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response) {
      // If the error has a response object, it's likely an API error
      const { status, detail } = error.response.body || {};
      throw new Error(
        `MailChimp API Error (${status}): ${detail || error.message}`,
      );
    } else {
      // Otherwise, it's likely a network or other error
      throw new Error(`Error retrieving survey response: ${error.message}`);
    }
  }
};
