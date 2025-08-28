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

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your Mailchimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const {
    campaignType,
    sinceSendTime,
    beforeSendTime,
    count,
    offset,
    outputVariable,
  } = inputs;

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log('Connecting to Mailchimp API...');

  // Build parameters object, only including defined values
  const params: Record<string, any> = {};

  if (campaignType) {
    params.type = campaignType;
  }

  if (sinceSendTime) {
    params.since_send_time = sinceSendTime;
  }

  if (beforeSendTime) {
    params.before_send_time = beforeSendTime;
  }

  // Convert count and offset to numbers if provided
  if (count) {
    params.count = parseInt(count, 10);
  }

  if (offset) {
    params.offset = parseInt(offset, 10);
  }

  try {
    log('Fetching campaign reports...');

    // Call the Mailchimp API to get campaign reports
    const response = await mailchimp.reports.getReports(params);

    log(`Successfully retrieved ${response.reports.length} campaign reports.`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors from the Mailchimp API
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error fetching campaign reports: ${error.message}`);
    }
  }
};
