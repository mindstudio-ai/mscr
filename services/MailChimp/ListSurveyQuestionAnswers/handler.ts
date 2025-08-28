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
  const { surveyId, questionId, respondentFamiliarity, outputVariable } =
    inputs;

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

  log(
    `Retrieving answers for survey ID: ${surveyId}, question ID: ${questionId}`,
  );

  try {
    // Prepare parameters for the API call
    const params: Record<string, any> = {};

    // Add respondent familiarity filter if provided
    if (respondentFamiliarity) {
      params.respondent_familiarity_is = respondentFamiliarity;
      log(`Filtering by respondent familiarity: ${respondentFamiliarity}`);
    }

    // Make the API request
    // The path follows the pattern: /reporting/surveys/{survey_id}/questions/{question_id}/answers
    const response = await mailchimp.get(
      `/reporting/surveys/${surveyId}/questions/${questionId}/answers`,
      params,
    );

    log(
      `Successfully retrieved ${response.total_items} answers for the survey question`,
    );

    // Set the output variable with the full response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const detail = error.response.data?.detail || 'Unknown error';

      if (status === 404) {
        throw new Error(
          `Survey or question not found. Please check your Survey ID and Question ID. Details: ${detail}`,
        );
      } else {
        throw new Error(`MailChimp API error (${status}): ${detail}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        'No response received from MailChimp API. Please check your network connection and try again.',
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error making request: ${error.message}`);
    }
  }
};
