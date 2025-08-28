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
  const { workflowId, emailAddress, outputVariable } = inputs;

  // Extract environment variables
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

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    // Log the operation being performed
    log(`Removing subscriber ${emailAddress} from workflow ${workflowId}...`);

    // Make the API call to remove the subscriber from the workflow
    const response = await mailchimp.automations.removeSubscriberFromWorkflow(
      workflowId,
      {
        email_address: emailAddress,
      },
    );

    // Log success
    log(`Successfully removed ${emailAddress} from the workflow.`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    const errorMessage =
      error.response?.body?.detail || error.message || 'Unknown error occurred';

    // Provide a user-friendly error message
    if (error.status === 404) {
      throw new Error(
        `Workflow ID or subscriber not found. Please check that both the workflow ID and email address are correct.`,
      );
    } else if (error.status === 401) {
      throw new Error(
        `Authentication failed. Please check your Mailchimp API key and server prefix.`,
      );
    } else {
      throw new Error(`Failed to remove subscriber: ${errorMessage}`);
    }
  }
};
