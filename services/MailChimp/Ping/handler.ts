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
      'Missing API Key. Please add your MailChimp API key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your MailChimp server prefix (e.g., us19) in the connector settings.',
    );
  }

  // Extract input variables
  const { outputVariable } = inputs;

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log('Checking MailChimp API health status...');

  try {
    // Call the ping endpoint to check API health
    const response = await mailchimp.ping.get();

    log(`MailChimp API is healthy: ${response.health_status}`);

    // Set the output variable with the health status response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    log('Error connecting to MailChimp API');

    if (error instanceof Error) {
      throw new Error(`MailChimp API Error: ${error.message}`);
    } else {
      throw new Error(
        'Unknown error occurred while connecting to MailChimp API',
      );
    }
  }
};
