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
}) => {
  // Get environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey || !serverPrefix) {
    throw new Error(
      'Missing required environment variables: apiKey and serverPrefix must be configured',
    );
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Extract inputs
  const {
    listId,
    emailAddress,
    status,
    mergeFields,
    tags,
    language,
    vip,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!emailAddress) {
    throw new Error('Email address is required');
  }

  if (!status) {
    throw new Error('Status is required');
  }

  // Generate MD5 hash of lowercase email address for subscriber_hash
  const subscriberHash = crypto
    .createHash('md5')
    .update(emailAddress.toLowerCase())
    .digest('hex');

  log(`Processing subscriber: ${emailAddress}`);

  // Prepare member data
  const memberData: Record<string, any> = {
    email_address: emailAddress,
    status_if_new: status,
    status,
  };

  // Add optional fields if provided
  if (mergeFields) {
    memberData.merge_fields =
      typeof mergeFields === 'string' ? JSON.parse(mergeFields) : mergeFields;
    log(
      `Adding merge fields: ${Object.keys(memberData.merge_fields).join(', ')}`,
    );
  }

  if (language) {
    memberData.language = language;
  }

  if (vip !== undefined) {
    memberData.vip = vip === 'true';
  }

  try {
    // Make API call to add or update the list member
    log(`Sending request to MailChimp to add/update subscriber...`);
    const response = await mailchimp.lists.setListMember(
      listId,
      subscriberHash,
      memberData,
    );

    log(`Successfully added/updated subscriber: ${emailAddress}`);

    // Process tags if provided
    if (tags && tags.trim()) {
      const tagArray = tags.split(',').map((tag) => ({
        name: tag.trim(),
        status: 'active',
      }));

      log(`Adding tags: ${tags}`);
      await mailchimp.lists.updateListMemberTags(listId, subscriberHash, {
        tags: tagArray,
      });

      // Refresh member data to include tags
      const updatedMember = await mailchimp.lists.getListMember(
        listId,
        subscriberHash,
      );

      setOutput(outputVariable, updatedMember);
    } else {
      setOutput(outputVariable, response);
    }
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    }
    throw error;
  }
};
