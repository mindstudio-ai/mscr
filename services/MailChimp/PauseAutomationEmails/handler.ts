import mailchimp from '@mailchimp/mailchimp_marketing';

export const handler = async ({
  inputs,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate environment variables
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
  const { workflowId } = inputs;

  // Validate inputs
  if (!workflowId) {
    throw new Error('Workflow ID is required to pause automation emails.');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey: apiKey,
    server: serverPrefix,
  });

  // Log the action being performed
  log(`Pausing all emails in automation workflow: ${workflowId}`);

  try {
    // Make API call to pause all emails in the automation workflow
    await mailchimp.automations.pauseAllEmails(workflowId);

    // Log success message
    log(`Successfully paused all emails in automation workflow: ${workflowId}`);
  } catch (error) {
    // Handle specific error cases
    if (error.response && error.response.status === 404) {
      throw new Error(
        `Automation workflow with ID ${workflowId} not found. Please check the ID and try again.`,
      );
    } else if (error.response && error.response.status === 401) {
      throw new Error(
        'Authentication failed. Please check your API key and server prefix.',
      );
    } else {
      // Log and throw the error for other cases
      const errorMessage =
        error.response?.body?.detail ||
        error.message ||
        'An unknown error occurred';
      throw new Error(`Failed to pause automation emails: ${errorMessage}`);
    }
  }
};
