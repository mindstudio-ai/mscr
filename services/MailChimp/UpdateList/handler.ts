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
      'Missing API Key. Please add your Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your Mailchimp Server Prefix in the connector settings.',
    );
  }

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Extract inputs
  const {
    listId,
    name,
    permissionReminder,
    emailTypeOption,
    companyName,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    phone,
    fromName,
    fromEmail,
    subject,
    language,
    doubleOptin,
    marketingPermissions,
    notifyOnSubscribe,
    notifyOnUnsubscribe,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required.');
  }

  log(`Updating Mailchimp list: ${name}`);

  // Convert string boolean values to actual booleans
  const emailTypeOptionBool = emailTypeOption === 'true';
  const doubleOptinBool = doubleOptin === 'true';
  const marketingPermissionsBool = marketingPermissions === 'true';

  // Prepare the request data
  const updateData: any = {
    name,
    permission_reminder: permissionReminder,
    email_type_option: emailTypeOptionBool,
    contact: {
      company: companyName,
      address1,
      city,
      state,
      zip,
      country,
    },
    campaign_defaults: {
      from_name: fromName,
      from_email: fromEmail,
      subject,
      language,
    },
  };

  // Add optional fields if provided
  if (address2) {
    updateData.contact.address2 = address2;
  }

  if (phone) {
    updateData.contact.phone = phone;
  }

  if (doubleOptin !== undefined) {
    updateData.double_optin = doubleOptinBool;
  }

  if (marketingPermissions !== undefined) {
    updateData.marketing_permissions = marketingPermissionsBool;
  }

  if (notifyOnSubscribe) {
    updateData.notify_on_subscribe = notifyOnSubscribe;
  }

  if (notifyOnUnsubscribe) {
    updateData.notify_on_unsubscribe = notifyOnUnsubscribe;
  }

  try {
    // Make the API call to update the list
    const response = await mailchimp.lists.updateList(listId, updateData);

    log(`Successfully updated list: ${response.name}`);

    // Set the output variable with the API response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle errors from the Mailchimp API
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.title ||
        error.message;
      throw new Error(`Mailchimp API Error: ${errorDetail}`);
    } else {
      throw new Error(`Error updating Mailchimp list: ${error.message}`);
    }
  }
};
