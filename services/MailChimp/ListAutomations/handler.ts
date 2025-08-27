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
  const { apiKey, serverPrefix } = process.env;

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

  // Initialize the MailChimp client
  mailchimp.setConfig({
    apiKey: apiKey,
    server: serverPrefix,
  });

  // Extract and validate inputs
  const {
    count,
    offset,
    status,
    beforeCreateTime,
    sinceCreateTime,
    outputVariable,
  } = inputs;

  // Prepare query parameters
  const params: Record<string, any> = {};

  // Add count parameter if provided
  if (count) {
    const countNum = parseInt(count, 10);
    if (isNaN(countNum) || countNum < 1 || countNum > 1000) {
      throw new Error('Count must be a number between 1 and 1000');
    }
    params.count = countNum;
  }

  // Add offset parameter if provided
  if (offset) {
    const offsetNum = parseInt(offset, 10);
    if (isNaN(offsetNum) || offsetNum < 0) {
      throw new Error('Offset must be a non-negative number');
    }
    params.offset = offsetNum;
  }

  // Add status parameter if provided
  if (status) {
    params.status = status;
  }

  // Add before_create_time parameter if provided
  if (beforeCreateTime) {
    params.before_create_time = beforeCreateTime;
  }

  // Add since_create_time parameter if provided
  if (sinceCreateTime) {
    params.since_create_time = sinceCreateTime;
  }

  try {
    log('Fetching automations from MailChimp...');

    // Call the MailChimp API to list automations
    const response = await mailchimp.automations.list(params);

    log(
      `Successfully retrieved ${response.automations.length} automation workflows`,
    );

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle specific error cases
    if (error.status === 401) {
      throw new Error(
        'Authentication failed. Please check your API Key and Server Prefix.',
      );
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      // Log the error details for debugging
      log(`Error fetching automations: ${error.message || 'Unknown error'}`);
      throw new Error(
        `Failed to fetch automations: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
