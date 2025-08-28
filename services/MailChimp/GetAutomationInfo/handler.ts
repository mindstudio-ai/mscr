import mailchimp from '@mailchimp/mailchimp_marketing';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
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
  const { workflowId, fields, excludeFields, outputVariable } = inputs;

  // Validate required inputs
  if (!workflowId) {
    throw new Error('Workflow ID is required.');
  }

  // Initialize the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving automation workflow with ID: ${workflowId}`);

  try {
    // Prepare query parameters
    const queryParams: Record<string, any> = {};

    if (fields) {
      queryParams.fields = fields;
      log(`Including fields: ${fields}`);
    }

    if (excludeFields) {
      queryParams.exclude_fields = excludeFields;
      log(`Excluding fields: ${excludeFields}`);
    }

    // Call the MailChimp API to get the automation workflow
    const response = await mailchimp.automations.getWorkflow(
      workflowId,
      queryParams,
    );

    log(
      `Successfully retrieved automation workflow: ${response.settings?.title || workflowId}`,
    );

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    } else {
      throw new Error(`Error retrieving automation workflow: ${error.message}`);
    }
  }
};
