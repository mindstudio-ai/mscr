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
      'Missing Mailchimp API Key. Please check your connection settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please check your connection settings.',
    );
  }

  // Extract inputs
  const {
    listId,
    name,
    tag,
    type,
    required,
    defaultValue,
    public: isPublic,
    helpText,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!name) {
    throw new Error('Field Name is required');
  }

  if (!type) {
    throw new Error('Field Type is required');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare merge field data
  const mergeFieldData: Record<string, any> = {
    name,
    type,
  };

  // Add optional fields if provided
  if (tag) {
    mergeFieldData.tag = tag;
  }
  if (required !== undefined) {
    mergeFieldData.required = required === true || required === 'true';
  }
  if (defaultValue) {
    mergeFieldData.default_value = defaultValue;
  }
  if (isPublic !== undefined) {
    mergeFieldData.public = isPublic === true || isPublic === 'true';
  }
  if (helpText) {
    mergeFieldData.help_text = helpText;
  }

  try {
    log(`Creating merge field "${name}" for list ${listId}...`);

    // Call Mailchimp API to create the merge field
    const response = await mailchimp.lists.addListMergeField(
      listId,
      mergeFieldData,
    );

    log(
      `Successfully created merge field "${response.name}" with tag "${response.tag}"`,
    );

    // Set the output variable with the API response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`Mailchimp API Error: ${error.response.body.detail}`);
    } else {
      throw new Error(`Failed to create merge field: ${error.message}`);
    }
  }
};
