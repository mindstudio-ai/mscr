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
      'Mailchimp API Key is missing. Please check your configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Mailchimp Server Prefix is missing. Please check your configuration.',
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
    apiKey,
    server: serverPrefix,
  });

  try {
    // Log the operation
    log(`Publishing survey (ID: ${surveyId}) for list (ID: ${listId})...`);

    // Make API request to publish the survey
    const response = await mailchimp.lists.publishSurvey(listId, surveyId);

    // Log success
    log('Survey published successfully!');

    // Set the output variable with the response
    setOutput(outputVariable, {
      success: true,
      message: 'Survey published successfully',
      data: response,
    });
  } catch (error) {
    // Handle errors
    log(
      `Error publishing survey: ${error instanceof Error ? error.message : String(error)}`,
    );

    // Set error in output
    setOutput(outputVariable, {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
      error: error,
    });

    // Re-throw the error to indicate failure
    throw error;
  }
};
