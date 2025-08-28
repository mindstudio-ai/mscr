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
      'Missing Mailchimp API Key. Please add it in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please add it in the connector settings.',
    );
  }

  // Extract inputs
  const { outreachId, fields, excludeFields, outputVariable } = inputs;

  if (!outreachId) {
    throw new Error('Landing Page ID is required');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Getting landing page report for ID: ${outreachId}`);

  // Prepare options for the API request
  const options: Record<string, any> = {};

  if (fields) {
    options.fields = fields;
  }

  if (excludeFields) {
    options.exclude_fields = excludeFields;
  }

  try {
    // Make API request to get landing page report
    const response = await mailchimp.reporting.getLandingPageReport(
      outreachId,
      options,
    );

    log(
      `Successfully retrieved landing page report for "${response.name || outreachId}"`,
    );

    // Set the output with the landing page report data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Failed to get landing page report: ${error.message}`);
    }
  }
};
