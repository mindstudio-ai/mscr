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
  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

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

  // Extract inputs
  const {
    listId,
    mergeId,
    name,
    tag,
    required,
    defaultValue,
    public: isPublic,
    displayOrder,
    helpText,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!mergeId) {
    throw new Error('Merge Field ID is required');
  }

  if (!name) {
    throw new Error('Field Name is required');
  }

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare the update payload
  const updateData: Record<string, any> = {
    name,
  };

  // Add optional fields if provided
  if (tag !== undefined) {
    updateData.tag = tag;
  }

  if (required !== undefined) {
    updateData.required = required === 'true';
  }

  if (defaultValue !== undefined) {
    updateData.default_value = defaultValue;
  }

  if (isPublic !== undefined) {
    updateData.public = isPublic === 'true';
  }

  if (displayOrder !== undefined && displayOrder !== '') {
    updateData.display_order = parseInt(displayOrder, 10);
  }

  if (helpText !== undefined) {
    updateData.help_text = helpText;
  }

  try {
    log(
      `Updating merge field '${name}' (ID: ${mergeId}) for list ${listId}...`,
    );

    // Call the Mailchimp API to update the merge field
    const response = await mailchimp.lists.updateMergeField(
      listId,
      mergeId,
      updateData,
    );

    log(`Successfully updated merge field '${response.name}'`);

    // Set the output variable with the API response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`Mailchimp API Error: ${error.response.body.detail}`);
    } else {
      throw new Error(`Error updating merge field: ${error.message}`);
    }
  }
};
