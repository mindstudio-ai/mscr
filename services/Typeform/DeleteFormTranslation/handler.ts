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

  const { formId, language, outputVariable } = inputs;

  if (!formId) {
    throw new Error('Form ID is required');
  }

  if (!language) {
    throw new Error('Language code is required');
  }

  log(`Deleting translation for form ${formId} in language ${language}...`);

  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${formId}/translations/${language}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 204) {
      const result = {
        success: true,
        message: `Successfully deleted ${language} translation for form ${formId}`,
      };
      log(`Successfully deleted the translation`);
      setOutput(outputVariable, result);
      return;
    }

    // Handle error responses
    const errorData = (await response.json()) as any;

    if (response.status === 404) {
      const result = {
        success: false,
        error: 'Not found',
        message: 'The form or translation was not found',
        details: errorData,
      };
      log(`Error: Form or translation not found`);
      setOutput(outputVariable, result);
      return;
    }

    if (response.status === 400) {
      const result = {
        success: false,
        error: 'Bad request',
        message: 'The request was invalid',
        details: errorData,
      };
      log(`Error: Invalid request`);
      setOutput(outputVariable, result);
      return;
    }

    if (response.status === 401 || response.status === 403) {
      const result = {
        success: false,
        error: 'Authentication error',
        message: 'Please check your authentication token',
        details: errorData,
      };
      log(`Error: Authentication failed`);
      setOutput(outputVariable, result);
      return;
    }

    // Handle any other errors
    const result = {
      success: false,
      error: `HTTP error ${response.status}`,
      message: 'An error occurred while deleting the translation',
      details: errorData,
    };
    log(`Error: Failed to delete translation (HTTP ${response.status})`);
    setOutput(outputVariable, result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    log(`Error: ${errorMessage}`);
    setOutput(outputVariable, {
      success: false,
      error: 'Request failed',
      message: errorMessage,
    });
  }
};
