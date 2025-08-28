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
  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing Mailchimp API Key. Please configure it in the service settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please configure it in the service settings.',
    );
  }

  // Extract inputs
  const { fields, excludeFields, count, offset, outputVariable } = inputs;

  // Validate required inputs
  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare request parameters
  const params: Record<string, any> = {};

  if (fields) {
    params.fields = fields;
  }

  if (excludeFields) {
    params.exclude_fields = excludeFields;
  }

  if (count) {
    params.count = parseInt(count, 10);
  }

  if (offset) {
    params.offset = parseInt(offset, 10);
  }

  log('Fetching survey reports from Mailchimp...');

  try {
    // Make API request to get survey reports
    const response = await mailchimp.reporting.getSurveys(params);

    log(`Successfully retrieved ${response.surveys.length} survey reports`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error fetching survey reports: ${error.message}`);
    }
  }
};
