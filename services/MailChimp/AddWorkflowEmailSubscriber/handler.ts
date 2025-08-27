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
  const { workflowId, workflowEmailId, emailAddress, outputVariable } = inputs;

  // Validate required environment variables
  const { apiKey, serverPrefix } = process.env;
  if (!apiKey) {
    throw new Error('Missing MailChimp API Key in environment variables');
  }
  if (!serverPrefix) {
    throw new Error('Missing MailChimp Server Prefix in environment variables');
  }

  // Validate required inputs
  if (!workflowId) {
    throw new Error('Workflow ID is required');
  }
  if (!workflowEmailId) {
    throw new Error('Workflow Email ID is required');
  }
  if (!emailAddress) {
    throw new Error('Subscriber Email Address is required');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Adding subscriber ${emailAddress} to workflow email...`);

  try {
    // Add the subscriber to the workflow email
    const response = await mailchimp.automations.addWorkflowEmailSubscriber(
      workflowId,
      workflowEmailId,
      {
        email_address: emailAddress,
      },
    );

    log(`Successfully added ${emailAddress} to the workflow email`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      log(`Error: ${errorDetail}`);
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    } else {
      log(`Error: ${error.message || 'Unknown error'}`);
      throw error;
    }
  }
};
