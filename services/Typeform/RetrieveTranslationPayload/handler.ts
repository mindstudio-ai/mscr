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

  const { formId, outputVariable } = inputs;
  if (!formId) {
    throw new Error(
      'Form ID is required. Please provide a valid Typeform form ID.',
    );
  }

  log(`Retrieving translation payload for form: ${formId}`);

  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${formId}/translations/main`,
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
          `Form ID '${formId}' not found. Please check the form ID and try again.`,
        );
      }

      const errorData = (await response.json()) as any;
      const errorMessage =
        errorData.description ||
        `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const translationData = (await response.json()) as any;

    log('Successfully retrieved translation payload');

    // Set the entire translation payload as the output
    setOutput(outputVariable, translationData);
  } catch (error) {
    // Handle any unexpected errors
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    log(`Error: ${errorMessage}`);
    throw error;
  }
};
