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
  const { surveyId, questionId, fields, excludeFields, outputVariable } =
    inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey || !serverPrefix) {
    throw new Error(
      'Missing required environment variables: API Key and Server Prefix must be provided',
    );
  }

  // Validate required inputs
  if (!surveyId) {
    throw new Error('Survey ID is required');
  }

  if (!questionId) {
    throw new Error('Question ID is required');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(
    `Retrieving report data for question "${questionId}" in survey "${surveyId}"...`,
  );

  try {
    // Prepare request parameters
    const params: Record<string, any> = {};

    // Add optional parameters if provided
    if (fields) {
      params.fields = fields;
    }

    if (excludeFields) {
      params.exclude_fields = excludeFields;
    }

    // Make API request to get survey question report
    const response = await mailchimp.reporting.getSurveyQuestionReport(
      surveyId,
      questionId,
      params,
    );

    log(`Successfully retrieved survey question report data`);

    // Set output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      // If it's a Mailchimp API error with details
      throw new Error(`Mailchimp API Error: ${error.response.body.detail}`);
    } else if (error.message) {
      // If it's a standard error with a message
      throw new Error(`Error: ${error.message}`);
    } else {
      // Fallback for unexpected errors
      throw new Error(
        'An unknown error occurred while retrieving the survey question report',
      );
    }
  }
};
