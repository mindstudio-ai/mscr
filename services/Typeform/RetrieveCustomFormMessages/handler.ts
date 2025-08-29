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

  const { formId, outputVariable } = inputs;
  if (!formId) {
    throw new Error('Form ID is required.');
  }

  log(`Retrieving custom messages for form: ${formId}`);

  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${formId}/messages`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `Form with ID "${formId}" not found. Please check your form ID.`,
        );
      } else if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Typeform connection settings.',
        );
      } else {
        throw new Error(
          `Error retrieving form messages: ${response.status} ${response.statusText}`,
        );
      }
    }

    const formMessages = (await response.json()) as any;
    log('Successfully retrieved form messages');

    setOutput(outputVariable, formMessages);
  } catch (error) {
    log(
      `Failed to retrieve form messages: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
