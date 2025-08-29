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
      'Missing Typeform authentication token. Please check your connection settings.',
    );
  }

  const { formId, outputVariable } = inputs;
  if (!formId) {
    throw new Error('Form ID is required. Please provide a valid Form ID.');
  }

  log(`Retrieving webhooks for form: ${formId}`);

  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${formId}/webhooks`,
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
          'Authentication failed. Please check your Typeform token.',
        );
      } else if (response.status === 404) {
        throw new Error(
          `Form with ID "${formId}" not found. Please check the Form ID.`,
        );
      } else {
        throw new Error(
          `Typeform API error: ${response.status} ${response.statusText}`,
        );
      }
    }

    const data = (await response.json()) as { items: any[] };
    log(`Successfully retrieved ${data.items?.length || 0} webhooks`);

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while retrieving webhooks');
  }
};
