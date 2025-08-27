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
      'Missing API Key. Please configure the MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure the MailChimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const {
    listId,
    members,
    updateExisting,
    skipMergeValidation,
    skipDuplicateCheck,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!members || !Array.isArray(members)) {
    throw new Error('Members must be a valid JSON array');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Convert string boolean values to actual booleans
  const updateExistingBool = updateExisting === 'true';
  const skipMergeValidationBool = skipMergeValidation === 'true';
  const skipDuplicateCheckBool = skipDuplicateCheck === 'true';

  try {
    log(`Batch processing ${members.length} members for list ID: ${listId}`);

    // Prepare the request payload
    const payload = {
      members,
      update_existing: updateExistingBool,
    };

    // Prepare query parameters
    const queryParams: Record<string, boolean> = {};

    if (skipMergeValidationBool) {
      queryParams.skip_merge_validation = true;
    }

    if (skipDuplicateCheckBool) {
      queryParams.skip_duplicate_check = true;
    }

    // Make the API request
    const response = await mailchimp.lists.batchListMembers(
      listId,
      payload,
      queryParams,
    );

    // Log the results
    log(
      `Operation completed successfully: ${response.total_created} members created, ${response.total_updated} members updated, ${response.error_count} errors`,
    );

    // Set the output variable with the full response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const errorDetail = error.response.body.detail || error.message;
      log(`Error: ${errorDetail}`);
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    } else {
      log(`Error: ${error.message}`);
      throw error;
    }
  }
};
