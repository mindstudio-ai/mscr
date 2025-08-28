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
  const { listId, segmentId, emailAddress, outputVar } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error(
      'Missing List ID. Please provide a valid MailChimp list ID.',
    );
  }

  if (!segmentId) {
    throw new Error('Missing Segment ID. Please provide a valid segment ID.');
  }

  if (!emailAddress) {
    throw new Error(
      'Missing Email Address. Please provide a valid email address to add to the segment.',
    );
  }

  // Configure MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(
    `Adding email address ${emailAddress} to segment ${segmentId} in list ${listId}...`,
  );

  try {
    // Make API call to add member to segment
    const response = await mailchimp.lists.createSegmentMember(
      listId,
      segmentId,
      {
        email_address: emailAddress,
      },
    );

    log(`Successfully added ${emailAddress} to the segment.`);

    // Set the output variable with the API response
    setOutput(outputVar, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const errorDetail = error.response.body.detail || error.message;
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    } else {
      throw new Error(`Error adding member to segment: ${error.message}`);
    }
  }
};
