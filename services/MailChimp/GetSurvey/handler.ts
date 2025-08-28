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

  // Validate required environment variables
  const { apiKey, serverPrefix } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing MailChimp API Key. Please check your connection settings.',
    );
  }
  if (!serverPrefix) {
    throw new Error(
      'Missing MailChimp Server Prefix. Please check your connection settings.',
    );
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Log the operation being performed
  log(
    `Retrieving survey details for survey ID: ${surveyId} from list ID: ${listId}`,
  );

  try {
    // Make the API request to get survey details
    const surveyDetails = await mailchimp.lists.getSurvey(listId, surveyId);

    // Log success
    log('Successfully retrieved survey details');

    // Set the output variable with the survey details
    setOutput(outputVariable, surveyDetails);
  } catch (error) {
    // Handle errors with user-friendly messages
    if (error.response && error.response.status === 404) {
      throw new Error(
        `Survey or list not found. Please check your List ID and Survey ID.`,
      );
    } else if (error.response && error.response.status === 401) {
      throw new Error(
        'Authentication failed. Please check your API Key and Server Prefix.',
      );
    } else {
      // Log the detailed error for debugging
      log(`Error retrieving survey: ${error.message}`);
      throw new Error(`Failed to retrieve survey details: ${error.message}`);
    }
  }
};
