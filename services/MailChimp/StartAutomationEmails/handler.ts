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
  const { workflowId, successMessageVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
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
  if (!workflowId) {
    throw new Error('Workflow ID is required.');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Starting all emails in automation workflow: ${workflowId}`);

  try {
    // Call the MailChimp API to start all emails in the automation workflow
    await mailchimp.automations.startAllEmails(workflowId);

    // This endpoint returns a 204 No Content response on success
    log('Successfully started all emails in the automation workflow');

    // Set the output variable with a success message
    setOutput(
      successMessageVariable,
      `All emails in automation workflow ${workflowId} have been successfully started.`,
    );
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error starting automation emails: ${error.message}`);
    }
  }
};
