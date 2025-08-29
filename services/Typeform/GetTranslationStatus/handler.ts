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
    throw new Error('Form ID is required');
  }

  log(`Retrieving translation status for form: ${formId}`);

  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${formId}/translations/status`,
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
          `Form ID "${formId}" not found. Please check your form ID and try again.`,
        );
      }

      const errorText = await response.text();
      throw new Error(
        `Failed to retrieve translation status: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const data = (await response.json()) as {
      languages: Array<{ code: string; status: string }>;
    };

    log(
      `Successfully retrieved translation status for ${data.languages.length} languages`,
    );

    // Set the output to the variable specified by the user
    setOutput(outputVariable, data.languages);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving translation status',
    );
  }
};
