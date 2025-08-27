import * as mailchimp from '@mailchimp/mailchimp_marketing';

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
  const { surveyId, fields, excludeFields, outputVariable } = inputs;

  // Validate required inputs
  if (!surveyId) {
    throw new Error('Survey ID is required');
  }

  // Get API credentials from environment variables
  const { apiKey, serverPrefix } = process.env;

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

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Fetching question reports for survey ID: ${surveyId}`);

  try {
    // Build request parameters
    const params: Record<string, any> = {};

    if (fields) {
      params.fields = fields;
    }

    if (excludeFields) {
      params.exclude_fields = excludeFields;
    }

    // Make the API request
    const response = await mailchimp.reporting.getSurveyQuestionReportsAll(
      surveyId,
      params,
    );

    log(
      `Successfully retrieved survey question reports. Found ${response.questions?.length || 0} questions.`,
    );

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`Mailchimp API error: ${errorDetail}`);
    } else {
      throw new Error(
        `Error fetching survey question reports: ${error.message || error}`,
      );
    }
  }
};
