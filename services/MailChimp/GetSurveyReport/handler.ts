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
  const { surveyId, fields, excludeFields, outputVariable } = inputs;

  // Validate required environment variables
  const { apiKey, serverPrefix } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing MailChimp API Key. Please check your service configuration.',
    );
  }
  if (!serverPrefix) {
    throw new Error(
      'Missing MailChimp Server Prefix. Please check your service configuration.',
    );
  }

  // Validate required inputs
  if (!surveyId) {
    throw new Error('Survey ID is required.');
  }

  // Initialize the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving survey report for survey ID: ${surveyId}`);

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

    // Make the API request to get the survey report
    const response = await mailchimp.reporting.getSurveyReport(
      surveyId,
      params,
    );

    log(
      `Successfully retrieved survey report: "${response.title || 'Untitled Survey'}"`,
    );

    // Set the output variable with the survey report data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error retrieving survey report: ${error.message}`);
    }
  }
};
