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
      'Missing Mailchimp API Key. Please add your API key in the service configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please add your server prefix (e.g., us19) in the service configuration.',
    );
  }

  // Extract and process inputs
  const {
    count = '10',
    offset = '0',
    fields = '',
    excludeFields = '',
    outputVariable,
  } = inputs;

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log('Connecting to Mailchimp API...');

  try {
    // Prepare query parameters
    const params: Record<string, any> = {};

    // Only add parameters if they have values
    if (count) {
      params.count = parseInt(count, 10);
    }
    if (offset) {
      params.offset = parseInt(offset, 10);
    }
    if (fields) {
      params.fields = fields;
    }
    if (excludeFields) {
      params.exclude_fields = excludeFields;
    }

    log('Fetching landing page reports...');

    // Make the API request
    const response = await mailchimp.reporting.getLandingPageReportsAll(params);

    log(
      `Successfully retrieved ${response.landing_pages?.length || 0} landing page reports.`,
    );

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle errors with user-friendly messages
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error fetching landing page reports: ${error.message}`);
    }
  }
};
