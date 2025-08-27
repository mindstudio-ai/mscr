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
  // Extract API credentials from environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate environment variables
  if (!apiKey) {
    throw new Error(
      'Missing MailChimp API Key. Please check your connection settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing MailChimp Server Prefix. Please check your connection settings.',
    );
  }

  // Extract input parameters
  const { workflowId, workflowEmailId } = inputs;

  // Validate required inputs
  if (!workflowId) {
    throw new Error('Workflow ID is required');
  }

  if (!workflowEmailId) {
    throw new Error('Workflow Email ID is required');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Log the operation being performed
  log(
    `Deleting workflow email (ID: ${workflowEmailId}) from workflow (ID: ${workflowId})...`,
  );

  try {
    // Call the MailChimp API to delete the workflow email
    await mailchimp.automations.deleteWorkflowEmail(
      workflowId,
      workflowEmailId,
    );

    // Log success message
    log('Workflow email deleted successfully');
  } catch (error) {
    // Handle specific error cases
    if (error.response && error.response.status === 404) {
      throw new Error(
        `Workflow or workflow email not found. Please check the IDs and try again.`,
      );
    } else if (error.response && error.response.status === 403) {
      throw new Error(
        `Cannot delete this workflow email. Emails from certain workflow types, including Abandoned Cart Email and Product Retargeting Email Workflows, cannot be deleted.`,
      );
    } else {
      // Handle general errors
      const errorMessage =
        error.response?.body?.detail ||
        error.message ||
        'An unknown error occurred';
      throw new Error(`Failed to delete workflow email: ${errorMessage}`);
    }
  }
};
