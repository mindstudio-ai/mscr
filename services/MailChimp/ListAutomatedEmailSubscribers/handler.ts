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
      'Missing MailChimp API Key. Please add it in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing MailChimp Server Prefix. Please add it in the connector settings.',
    );
  }

  const { workflowId, workflowEmailId, outputVariable } = inputs;

  // Validate required inputs
  if (!workflowId) {
    throw new Error('Workflow ID is required');
  }

  if (!workflowEmailId) {
    throw new Error('Workflow Email ID is required');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey: apiKey,
    server: serverPrefix,
  });

  log(
    `Retrieving subscribers for automation workflow ${workflowId}, email ${workflowEmailId}...`,
  );

  try {
    // Call the MailChimp API to get the email queue
    const response =
      await mailchimp.automations.getWorkflowEmailSubscriberQueue(
        workflowId,
        workflowEmailId,
      );

    log(
      `Successfully retrieved ${response.total_items} subscribers from the email queue`,
    );

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`MailChimp API Error: ${error.response.body.detail}`);
    } else {
      throw new Error(`Error retrieving email queue: ${error.message}`);
    }
  }
};
