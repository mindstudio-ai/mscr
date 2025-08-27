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
      'Missing API Key. Please add your MailChimp API key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your MailChimp server prefix in the connector settings.',
    );
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Extract inputs
  const {
    title,
    fromName,
    replyTo,
    listId,
    storeId,
    workflowType,
    outputVariable,
  } = inputs;

  // Build the request payload
  const automationData: any = {
    recipients: {
      list_id: listId,
    },
    settings: {
      title,
      from_name: fromName,
      reply_to: replyTo,
    },
    trigger_settings: {
      workflow_type: workflowType,
    },
  };

  // Add store_id if provided (required for abandonedCart workflow type)
  if (storeId && workflowType === 'abandonedCart') {
    automationData.recipients.store_id = storeId;
  }

  log(`Creating ${workflowType} automation workflow: "${title}"`);

  try {
    // Create the automation
    const response = await mailchimp.automations.create(automationData);

    log(`Successfully created automation with ID: ${response.id}`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { title, detail, status } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${title} - ${detail}`);
    } else {
      throw new Error(`Error creating automation: ${error.message}`);
    }
  }
};
