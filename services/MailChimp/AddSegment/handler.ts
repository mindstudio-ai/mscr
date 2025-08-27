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

  if (!apiKey) {
    throw new Error('Missing API Key in environment variables');
  }

  if (!serverPrefix) {
    throw new Error('Missing Server Prefix in environment variables');
  }

  const {
    listId,
    name,
    segmentType,
    matchType = 'all',
    staticSegment,
    outputVariable,
  } = inputs;

  // Configure the MailChimp client with API credentials
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Creating ${segmentType} segment "${name}" in list ${listId}`);

  try {
    let payload: Record<string, any> = {
      name,
    };

    // Prepare payload based on segment type
    if (segmentType === 'static') {
      if (staticSegment) {
        // Convert comma-separated emails to array and trim whitespace
        const emails = staticSegment
          .split(',')
          .map((email: string) => email.trim())
          .filter((email: string) => email.length > 0);

        payload.static_segment = emails;
        log(`Adding ${emails.length} email addresses to the static segment`);
      } else {
        payload.static_segment = [];
        log('Creating an empty static segment (no email addresses provided)');
      }
    } else {
      // Dynamic segment with basic conditions
      payload.options = {
        match: matchType,
        conditions: [], // Empty conditions will match all subscribers
      };
      log(`Creating a dynamic segment with match type: ${matchType}`);
    }

    // Create the segment using the MailChimp API
    const response = await mailchimp.lists.createSegment(listId, payload);

    log(`Successfully created segment "${name}" with ID: ${response.id}`);

    // Set the output variable with the segment details
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors with clear messages
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`MailChimp API Error: ${error.response.body.detail}`);
    } else if (error.message) {
      throw new Error(`Error creating segment: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while creating the segment');
    }
  }
};
