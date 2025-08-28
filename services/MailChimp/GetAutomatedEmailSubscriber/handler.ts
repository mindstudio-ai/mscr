import * as mailchimp from '@mailchimp/mailchimp_marketing';

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
  const { workflowId, workflowEmailId, subscriberHash, outputVariable } =
    inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your MailChimp API Key in the service configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your MailChimp Server Prefix in the service configuration.',
    );
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Log the operation
  log(
    `Retrieving subscriber information from automation workflow: ${workflowId}`,
  );

  try {
    // Make the API request to get the subscriber information
    const response = await mailchimp.automations.getWorkflowEmailSubscriber(
      workflowId,
      workflowEmailId,
      subscriberHash,
    );

    // Log success
    log(
      `Successfully retrieved information for subscriber: ${response.email_address}`,
    );

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    } else {
      throw new Error(
        `Error retrieving subscriber information: ${error.message}`,
      );
    }
  }
};
