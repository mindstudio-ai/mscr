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
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your MailChimp API Key in the service settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the service settings.',
    );
  }

  // Extract inputs
  const {
    surveyId,
    answeredQuestion,
    choseAnswer,
    respondentFamiliarity,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!surveyId) {
    throw new Error('Survey ID is required');
  }

  // Set up the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving responses for survey ID: ${surveyId}`);

  try {
    // Build query parameters
    const queryParams: Record<string, any> = {};

    if (answeredQuestion) {
      queryParams.answered_question = answeredQuestion;
      log(`Filtering by answered question ID: ${answeredQuestion}`);
    }

    if (choseAnswer) {
      queryParams.chose_answer = choseAnswer;
      log(`Filtering by chosen answer ID: ${choseAnswer}`);
    }

    if (respondentFamiliarity) {
      queryParams.respondent_familiarity_is = respondentFamiliarity;
      log(`Filtering by respondent familiarity: ${respondentFamiliarity}`);
    }

    // Make API request to get survey responses
    const response = await mailchimp.reporting.getSurveyResponsesAll(
      surveyId,
      queryParams,
    );

    log(`Successfully retrieved ${response.total_items} survey responses`);

    // Set output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(
        `Error retrieving survey responses: ${error.message || error}`,
      );
    }
  }
};
