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
      'Missing authentication token. Please check your Typeform connection settings.',
    );
  }

  const { formId, tag, outputVariable } = inputs;

  if (!formId) {
    throw new Error('Form ID is required');
  }

  if (!tag) {
    throw new Error('Webhook tag is required');
  }

  log(`Retrieving webhook '${tag}' for form '${formId}'...`);

  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${formId}/webhooks/${tag}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Typeform connection settings.',
        );
      } else if (response.status === 404) {
        throw new Error(
          `Webhook with tag '${tag}' not found for form '${formId}'.`,
        );
      } else {
        throw new Error(
          `Failed to retrieve webhook: ${response.status} ${response.statusText}`,
        );
      }
    }

    const webhookData = (await response.json()) as any;

    log(`Successfully retrieved webhook details for '${tag}'`);

    // Save the webhook details to the output variable
    setOutput(outputVariable, webhookData);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving the webhook');
  }
};
