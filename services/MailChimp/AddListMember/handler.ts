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
  // Extract environment variables
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

  // Extract inputs
  const {
    listId,
    emailAddress,
    status,
    emailType,
    mergeFields,
    tags,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!emailAddress) {
    throw new Error('Email Address is required');
  }

  if (!status) {
    throw new Error('Status is required');
  }

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Adding ${emailAddress} to MailChimp list ${listId}...`);

  // Prepare member data
  const memberData: Record<string, any> = {
    email_address: emailAddress,
    status,
  };

  // Add optional fields if provided
  if (emailType) {
    memberData.email_type = emailType;
  }

  // Add merge fields if provided
  if (mergeFields) {
    try {
      // If mergeFields is already an object, use it directly
      // If it's a string, try to parse it as JSON
      const parsedMergeFields =
        typeof mergeFields === 'string' ? JSON.parse(mergeFields) : mergeFields;

      memberData.merge_fields = parsedMergeFields;
    } catch (error) {
      throw new Error(
        `Invalid merge fields format. Please provide a valid JSON object: ${error}`,
      );
    }
  }

  // Add tags if provided
  if (tags) {
    // Convert comma-separated string to array
    const tagArray =
      typeof tags === 'string'
        ? tags.split(',').map((tag) => tag.trim())
        : Array.isArray(tags)
          ? tags
          : [tags];

    memberData.tags = tagArray;
  }

  try {
    // Add member to list
    const response = await mailchimp.lists.addListMember(listId, memberData);

    log(`Successfully added ${emailAddress} to the list`);

    // Set output variable
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`MailChimp API Error: ${error.response.body.detail}`);
    } else {
      throw new Error(`Error adding member to list: ${error.message || error}`);
    }
  }
};
