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
  // Extract inputs
  const { workflowId, workflowEmailId } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required inputs
  if (!workflowId) {
    throw new Error('Workflow ID is required');
  }

  if (!workflowEmailId) {
    throw new Error('Workflow Email ID is required');
  }

  // Validate environment variables
  if (!apiKey) {
    throw new Error(
      'MailChimp API Key is missing. Please check your service configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'MailChimp Server Prefix is missing. Please check your service configuration.',
    );
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(
    `Starting automated email (ID: ${workflowEmailId}) in workflow (ID: ${workflowId})...`,
  );

  try {
    // Start the automated email
    await mailchimp.automations.startWorkflowEmail(workflowId, workflowEmailId);

    // Success message
    log('Successfully started the automated email');
  } catch (error) {
    // Handle API errors
    if (error instanceof Error) {
      const errorMessage = error.message || 'Unknown error occurred';
      log(`Error starting automated email: ${errorMessage}`);
      throw new Error(`Failed to start automated email: ${errorMessage}`);
    } else {
      throw new Error(
        'An unexpected error occurred while starting the automated email',
      );
    }
  }
};
