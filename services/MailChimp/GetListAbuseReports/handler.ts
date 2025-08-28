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
      'Missing API Key. Please configure your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const { listId, count, offset, fields, excludeFields, outputVariable } =
    inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error(
      'Missing List ID. Please provide a valid MailChimp list ID.',
    );
  }

  if (!outputVariable) {
    throw new Error(
      'Missing Output Variable. Please specify an output variable name.',
    );
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare optional parameters
  const params: Record<string, any> = {};

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

  try {
    // Log the operation
    log(`Retrieving abuse reports for list ID: ${listId}`);

    // Make the API request
    const response = await mailchimp.lists.getListAbuseReports(listId, params);

    // Log success
    log(
      `Successfully retrieved ${response.abuse_reports.length} abuse reports out of ${response.total_items} total`,
    );

    // Set the output variable
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error retrieving abuse reports: ${error.message}`);
      throw error;
    } else {
      const errorMessage =
        'An unknown error occurred while retrieving abuse reports';
      log(errorMessage);
      throw new Error(errorMessage);
    }
  }
};
