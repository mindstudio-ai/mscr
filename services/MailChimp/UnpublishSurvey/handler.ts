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
  const { listId, surveyId, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing Mailchimp API Key. Please check your configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please check your configuration.',
    );
  }

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required.');
  }

  if (!surveyId) {
    throw new Error('Survey ID is required.');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey: apiKey,
    server: serverPrefix,
  });

  try {
    // Log the action being performed
    log(`Unpublishing survey ${surveyId} from list ${listId}...`);

    // Make API call to unpublish the survey
    const response = await mailchimp.lists.unpublishSurvey(listId, surveyId);

    // Log success
    log(`Successfully unpublished survey ${surveyId}`);

    // Set output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.status) {
      const status = error.response.status;

      if (status === 401) {
        throw new Error(
          'Authentication failed. Please check your API key and server prefix.',
        );
      } else if (status === 404) {
        throw new Error(
          `Resource not found. Please verify your List ID (${listId}) and Survey ID (${surveyId}).`,
        );
      } else {
        throw new Error(
          `Mailchimp API error (${status}): ${error.response.data?.detail || error.message}`,
        );
      }
    } else {
      // Generic error handling
      throw new Error(`Error unpublishing survey: ${error.message}`);
    }
  }
};
