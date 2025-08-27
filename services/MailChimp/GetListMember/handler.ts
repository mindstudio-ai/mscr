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

  // Validate environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the connector settings.',
    );
  }

  // Get inputs
  const { listId, subscriberId, fields, excludeFields, outputVariable } =
    inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!subscriberId) {
    throw new Error('Subscriber Email or ID is required');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(
    `Retrieving member information for ${subscriberId} from list ${listId}...`,
  );

  try {
    // Prepare options for the API call
    const options: Record<string, any> = {};

    // Add optional parameters if provided
    if (fields) {
      options.fields = fields;
    }

    if (excludeFields) {
      options.exclude_fields = excludeFields;
    }

    // Make the API call to get the list member
    const memberInfo = await mailchimp.lists.getListMember(
      listId,
      subscriberId,
      options,
    );

    log(
      `Successfully retrieved member information for ${memberInfo.email_address}`,
    );

    // Set the output variable with the member information
    setOutput(outputVariable, memberInfo);
  } catch (error: any) {
    // Handle common errors with user-friendly messages
    if (error.status === 404) {
      throw new Error(
        `Member not found. Please check if the email address or subscriber ID is correct.`,
      );
    } else if (error.status === 401) {
      throw new Error(
        'Authentication failed. Please check your API Key and Server Prefix.',
      );
    } else if (error.status === 403) {
      throw new Error(
        'Permission denied. Your API key may not have access to this list.',
      );
    } else {
      throw new Error(
        `Error retrieving member information: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
