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
  const { listId, segmentId, membersToAdd, membersToRemove, outputVariable } =
    inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!segmentId) {
    throw new Error('Segment ID is required');
  }

  if (!membersToAdd && !membersToRemove) {
    throw new Error(
      'You must specify at least one email address to add or remove',
    );
  }

  // Parse email addresses from inputs
  const parseEmails = (emailString: string | undefined): string[] => {
    if (!emailString) {
      return [];
    }

    // Handle both comma-separated and newline-separated formats
    return emailString
      .split(/[\s,]+/)
      .map((email) => email.trim())
      .filter((email) => email.length > 0);
  };

  const emailsToAdd = parseEmails(membersToAdd);
  const emailsToRemove = parseEmails(membersToRemove);

  // Validate email count (API limit is 500)
  if (emailsToAdd.length > 500) {
    throw new Error('Maximum of 500 email addresses can be added at once');
  }

  if (emailsToRemove.length > 500) {
    throw new Error('Maximum of 500 email addresses can be removed at once');
  }

  // Configure the client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    log('Connecting to MailChimp...');

    // Prepare request body
    const requestBody: {
      members_to_add?: string[];
      members_to_remove?: string[];
    } = {};

    if (emailsToAdd.length > 0) {
      requestBody.members_to_add = emailsToAdd;
      log(`Adding ${emailsToAdd.length} member(s) to segment...`);
    }

    if (emailsToRemove.length > 0) {
      requestBody.members_to_remove = emailsToRemove;
      log(`Removing ${emailsToRemove.length} member(s) from segment...`);
    }

    // Make API call
    const response = await mailchimp.lists.batchSegmentMembers(
      listId,
      segmentId,
      requestBody,
    );

    // Create a simplified response for the output
    const result = {
      totalAdded: response.total_added || 0,
      totalRemoved: response.total_removed || 0,
      errorCount: response.error_count || 0,
      errors: response.errors || [],
      membersAdded: response.members_added || [],
      membersRemoved: response.members_removed || [],
    };

    // Log results
    if (result.totalAdded > 0) {
      log(`Successfully added ${result.totalAdded} member(s) to the segment`);
    }

    if (result.totalRemoved > 0) {
      log(
        `Successfully removed ${result.totalRemoved} member(s) from the segment`,
      );
    }

    if (result.errorCount > 0) {
      log(`Encountered ${result.errorCount} error(s) during the operation`);
    }

    // Set output
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const apiError = error.response.body;
      throw new Error(
        `MailChimp API Error: ${apiError.title} - ${apiError.detail}`,
      );
    } else {
      throw error;
    }
  }
};
