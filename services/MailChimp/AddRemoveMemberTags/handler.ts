import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto';

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
    throw new Error('Missing MailChimp API Key');
  }
  if (!serverPrefix) {
    throw new Error('Missing MailChimp Server Prefix');
  }

  // Extract inputs
  const {
    listId,
    emailAddress,
    tagsToAdd = '',
    tagsToRemove = '',
    skipAutomations = 'false',
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }
  if (!emailAddress) {
    throw new Error('Email Address is required');
  }

  // Initialize MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Convert email to MD5 hash (subscriber_hash)
  const subscriberHash = crypto
    .createHash('md5')
    .update(emailAddress.toLowerCase())
    .digest('hex');

  log(`Processing tags for member: ${emailAddress}`);

  // Prepare tags array
  const tags = [];

  // Process tags to add
  if (tagsToAdd && tagsToAdd.trim() !== '') {
    const addTags = tagsToAdd
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    addTags.forEach((tagName) => {
      tags.push({
        name: tagName,
        status: 'active',
      });
    });
    log(`Tags to add: ${addTags.join(', ')}`);
  }

  // Process tags to remove
  if (tagsToRemove && tagsToRemove.trim() !== '') {
    const removeTags = tagsToRemove
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    removeTags.forEach((tagName) => {
      tags.push({
        name: tagName,
        status: 'inactive',
      });
    });
    log(`Tags to remove: ${removeTags.join(', ')}`);
  }

  // If no tags specified, inform the user
  if (tags.length === 0) {
    log('No tags specified to add or remove');
    setOutput(outputVariable, {
      success: true,
      message: 'No tags specified to add or remove',
    });
    return;
  }

  try {
    // Prepare request body
    const requestBody = {
      tags,
      is_syncing: skipAutomations === 'true',
    };

    // Make API request to update member tags
    await mailchimp.lists.updateListMemberTags(
      listId,
      subscriberHash,
      requestBody,
    );

    log('Successfully updated member tags');

    setOutput(outputVariable, {
      success: true,
      message: 'Successfully updated member tags',
      emailAddress,
      tagsAdded: tagsToAdd
        ? tagsToAdd
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
      tagsRemoved: tagsToRemove
        ? tagsToRemove
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
    });
  } catch (error) {
    log(`Error updating member tags: ${error.message || 'Unknown error'}`);

    // Handle specific error cases
    if (error.status === 404) {
      throw new Error(`Member with email ${emailAddress} not found in list`);
    }

    throw error;
  }
};
