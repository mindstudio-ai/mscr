export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your connection settings.',
    );
  }

  const {
    formId,
    tag,
    url,
    enabled,
    formResponse,
    formResponsePartial,
    verifySSL,
    secret,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!formId) {
    throw new Error('Form ID is required');
  }
  if (!tag) {
    throw new Error('Webhook tag is required');
  }
  if (!url) {
    throw new Error('Webhook URL is required');
  }

  // Prepare request body
  const requestBody = {
    enabled: enabled === 'true',
    event_types: {
      form_response: formResponse === 'true',
      form_response_partial: formResponsePartial === 'true',
    },
    url,
    verify_ssl: verifySSL === 'true',
  };

  // Add secret if provided
  if (secret) {
    requestBody['secret'] = secret;
  }

  log(`Creating webhook for form ${formId} with tag ${tag}...`);

  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${formId}/webhooks/${tag}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to create webhook: ${response.status} ${response.statusText}`;

      if (response.status === 401) {
        errorMessage =
          'Authentication failed. Please check your Typeform connection.';
      } else if (response.status === 404) {
        errorMessage = `Form with ID '${formId}' not found. Please check your Form ID.`;
      } else if (response.status === 400) {
        errorMessage = `Invalid request: ${errorText}`;
      }

      throw new Error(errorMessage);
    }

    const webhookData = (await response.json()) as any;

    log(
      `Webhook '${webhookData.tag}' successfully ${webhookData.id ? 'created' : 'updated'}`,
    );

    // Set the output variable with the webhook data
    setOutput(outputVariable, webhookData);
  } catch (error) {
    // Handle network errors or other unexpected issues
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unexpected error occurred while creating the webhook');
  }
};
