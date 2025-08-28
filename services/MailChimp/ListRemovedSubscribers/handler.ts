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
  const { workflowId, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your Mailchimp Server Prefix in the connector settings.',
    );
  }

  // Validate required inputs
  if (!workflowId) {
    throw new Error('Missing Workflow ID. Please provide a valid Workflow ID.');
  }

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    // Log the start of the operation
    log(`Retrieving subscribers removed from workflow: ${workflowId}`);

    // Make the API call to get removed subscribers
    const response =
      await mailchimp.automations.getRemovedSubscribers(workflowId);

    // Log success
    log(`Successfully retrieved ${response.total_items} removed subscribers`);

    // Set the output
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error retrieving removed subscribers: ${error.message}`);
    }
  }
};
