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
      'Missing authentication token. Please check your Typeform integration settings.',
    );
  }

  const { formId, webhookTag, outputVariable } = inputs;

  if (!formId) {
    throw new Error('Form ID is required');
  }

  if (!webhookTag) {
    throw new Error('Webhook Tag is required');
  }

  log(`Deleting webhook '${webhookTag}' from form '${formId}'...`);

  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${formId}/webhooks/${webhookTag}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 204) {
      log('Webhook deleted successfully');
      setOutput(outputVariable, 'Webhook successfully deleted');
      return;
    }

    if (response.status === 401) {
      throw new Error(
        'Authentication failed. Please check your Typeform access token.',
      );
    }

    if (response.status === 404) {
      throw new Error(
        `Webhook with tag '${webhookTag}' not found for form '${formId}'.`,
      );
    }

    // Handle other error cases
    throw new Error(
      `Failed to delete webhook. Server responded with status ${response.status}`,
    );
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while deleting the webhook');
  }
};
