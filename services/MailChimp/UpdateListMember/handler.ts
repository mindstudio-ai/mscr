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
  // Get environment variables
  const { apiKey, serverPrefix } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your MailChimp API Key in the service settings.',
    );
  }
  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the service settings.',
    );
  }

  // Get required inputs
  const { listId, subscriberEmail, outputVariable } = inputs;
  if (!listId) {
    throw new Error('List ID is required');
  }
  if (!subscriberEmail) {
    throw new Error('Subscriber Email is required');
  }

  // Initialize MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Generate MD5 hash of the lowercase email address for the subscriber_hash
  const subscriberHash = crypto
    .createHash('md5')
    .update(subscriberEmail.toLowerCase())
    .digest('hex');

  // Prepare update payload
  const updatePayload: Record<string, any> = {
    email_address: subscriberEmail,
  };

  // Add optional fields if provided
  if (inputs.emailType) {
    updatePayload.email_type = inputs.emailType;
  }

  if (inputs.status) {
    updatePayload.status = inputs.status;
  }

  // Handle merge fields if provided
  if (inputs.mergeFields) {
    try {
      // If mergeFields is already an object, use it directly
      // If it's a string, parse it as JSON
      const mergeFields =
        typeof inputs.mergeFields === 'string'
          ? JSON.parse(inputs.mergeFields)
          : inputs.mergeFields;

      updatePayload.merge_fields = mergeFields;
    } catch (error) {
      throw new Error(`Invalid JSON format for merge fields: ${error.message}`);
    }
  }

  // Handle VIP status if provided and not "Don't Change"
  if (inputs.vip === 'true' || inputs.vip === 'false') {
    updatePayload.vip = inputs.vip === 'true';
  }

  // Handle language if provided
  if (inputs.language) {
    updatePayload.language = inputs.language;
  }

  // Prepare query parameters
  const queryParams: Record<string, any> = {};

  // Handle skip_merge_validation if provided
  if (
    inputs.skipMergeValidation === 'true' ||
    inputs.skipMergeValidation === 'false'
  ) {
    queryParams.skip_merge_validation = inputs.skipMergeValidation === 'true';
  }

  try {
    log(`Updating member ${subscriberEmail} in list ${listId}...`);

    // Make the API call to update the list member
    const response = await mailchimp.lists.updateListMember(
      listId,
      subscriberHash,
      updatePayload,
      queryParams,
    );

    log(`Successfully updated member ${subscriberEmail}`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    } else {
      throw new Error(`Error updating list member: ${error.message}`);
    }
  }
};
