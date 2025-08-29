export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { formId, outputVariable } = inputs;
  const { token } = process.env;

  // Validate required environment variables
  if (!token) {
    throw new Error(
      'Missing Typeform API token. Please check your connection configuration.',
    );
  }

  // Validate required inputs
  if (!formId) {
    throw new Error('Form ID is required. Please provide a valid Form ID.');
  }

  log(`Retrieving form with ID: ${formId}`);

  try {
    // Make request to Typeform API
    const response = await fetch(`https://api.typeform.com/forms/${formId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `Form with ID "${formId}" not found. Please check your Form ID.`,
        );
      } else if (response.status === 401 || response.status === 403) {
        throw new Error(
          'Authentication failed. Please check your Typeform API token.',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Typeform API error: ${response.status} ${response.statusText}`,
        );
      }
    }

    // Parse response
    const formData = (await response.json()) as any;

    log(`Successfully retrieved form: "${formData.title}"`);

    // Set output variable with form data
    setOutput(outputVariable, formData);
  } catch (error) {
    // Handle and rethrow errors with clear messages
    if (error instanceof Error) {
      throw new Error(`Error retrieving form: ${error.message}`);
    }
    throw new Error('An unknown error occurred while retrieving the form');
  }
};
