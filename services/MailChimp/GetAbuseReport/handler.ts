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
  const { listId, reportId, fields, excludeFields, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error('Missing API Key in environment variables');
  }

  if (!serverPrefix) {
    throw new Error('Missing Server Prefix in environment variables');
  }

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!reportId) {
    throw new Error('Report ID is required');
  }

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare parameters for the API call
  const params: Record<string, any> = {};

  if (fields) {
    params.fields = fields;
  }

  if (excludeFields) {
    params.exclude_fields = excludeFields;
  }

  try {
    log(`Retrieving abuse report ${reportId} for list ${listId}...`);

    // Make the API call to get the abuse report
    const response = await mailchimp.lists.getListAbuseReportDetails(
      listId,
      reportId,
      params,
    );

    log('Successfully retrieved abuse report details');

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response) {
      const { status, detail } = error.response.body || {};
      throw new Error(
        `MailChimp API Error (${status}): ${detail || error.message}`,
      );
    } else {
      throw new Error(`Error retrieving abuse report: ${error.message}`);
    }
  }
};
