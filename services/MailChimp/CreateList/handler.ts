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
  // Get environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your Mailchimp Server Prefix in the connector settings.',
    );
  }

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Extract inputs
  const {
    name,
    permissionReminder,
    emailTypeOption,
    company,
    address1,
    city,
    state,
    zip,
    country,
    fromName,
    fromEmail,
    subject,
    language,
    outputVariable,
  } = inputs;

  // Convert string boolean to actual boolean
  const emailTypeOptionBool = emailTypeOption === 'true';

  log(`Creating new Mailchimp list: "${name}"`);

  try {
    // Prepare the list creation payload
    const listData = {
      name,
      permission_reminder: permissionReminder,
      email_type_option: emailTypeOptionBool,
      contact: {
        company,
        address1,
        city,
        country,
        // Include optional fields only if provided
        ...(state && { state }),
        ...(zip && { zip }),
      },
      campaign_defaults: {
        from_name: fromName,
        from_email: fromEmail,
        subject,
        language,
      },
    };

    // Create the list
    const response = await mailchimp.lists.createList(listData);

    log(`Successfully created list "${name}" with ID: ${response.id}`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`Mailchimp API Error: ${error.response.body.detail}`);
    } else {
      throw new Error(`Error creating Mailchimp list: ${error.message}`);
    }
  }
};
