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
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Typeform connection settings.',
    );
  }

  const { formId, language, outputVariable } = inputs;

  if (!formId) {
    throw new Error('Form ID is required.');
  }

  if (!language) {
    throw new Error('Language code is required.');
  }

  log(`Retrieving translation for form ${formId} in ${language} language...`);

  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${formId}/translations/${language}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(
          `The requested language (${language}) is not available for this form.`,
        );
      } else if (response.status === 404) {
        throw new Error(
          `Form or translation not found. Please check your Form ID and language selection.`,
        );
      } else {
        const errorText = await response.text();
        throw new Error(
          `Error retrieving translation: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }
    }

    const translationData = (await response.json()) as any;
    log('Successfully retrieved translation data.');

    setOutput(outputVariable, translationData);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve form translation: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while retrieving the form translation.',
      );
    }
  }
};
