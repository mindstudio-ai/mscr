export const handler = async ({
  inputs,
  setOutput,
  log,
  uploadFile,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Extract inputs
  const { orderId, templateId, email, forceEmailUpdate, outputVariable } =
    inputs;

  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate required environment variables
  if (!url) {
    throw new Error(
      "Missing WooCommerce store URL. Please configure the 'url' environment variable.",
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      "Missing WooCommerce API credentials. Please configure the 'consumerKey' and 'consumerSecret' environment variables.",
    );
  }

  // Validate required inputs
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  if (!templateId) {
    throw new Error('Email template is required');
  }

  // Prepare request URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `/wp-json/wc/v3/orders/${orderId}/actions/send_email`;
  const requestUrl = `${baseUrl}${endpoint}`;

  // Prepare request body
  const requestBody: Record<string, any> = {
    template_id: templateId,
  };

  // Add optional parameters if provided
  if (email) {
    requestBody.email = email;
  }

  if (forceEmailUpdate === 'true') {
    requestBody.force_email_update = true;
  }

  // Prepare authentication
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  try {
    log(`Sending ${templateId} email notification for order #${orderId}...`);

    // Make the API request
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle API error
      log(
        `Error sending email notification: ${data.message || 'Unknown error'}`,
      );
      setOutput(outputVariable, {
        success: false,
        message: data.message || 'Failed to send email notification',
        error: data,
      });
      return;
    }

    // Success case
    log(`Email notification sent successfully: ${data.message}`);
    setOutput(outputVariable, {
      success: true,
      message: data.message,
      error: null,
    });
  } catch (error) {
    // Handle network or other errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error: ${errorMessage}`);
    setOutput(outputVariable, {
      success: false,
      message: 'Failed to send email notification',
      error: errorMessage,
    });
  }
};
