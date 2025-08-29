export const handler = async ({
  inputs,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your connection settings.',
    );
  }

  const { formId } = inputs;
  if (!formId) {
    throw new Error('Form ID is required');
  }

  // Build the messages object with only the values that were provided
  const messages: Record<string, string> = {};

  // Map input variables to Typeform API field names
  if (inputs.submitButtonText) {
    messages['label.button.submit'] = inputs.submitButtonText;
  }

  if (inputs.successMessage) {
    messages['label.warning.success'] = inputs.successMessage;
  }

  if (inputs.requiredFieldError) {
    messages['label.error.required'] = inputs.requiredFieldError;
  }

  if (inputs.yesText) {
    messages['label.yes.default'] = inputs.yesText;
  }

  if (inputs.noText) {
    messages['label.no.default'] = inputs.noText;
  }

  if (inputs.multipleChoiceHint) {
    messages['block.multipleChoice.hint'] = inputs.multipleChoiceHint;
  }

  // If no messages were provided, inform the user
  if (Object.keys(messages).length === 0) {
    log('No custom messages were provided to update');
    return;
  }

  log(`Updating custom messages for form ${formId}...`);

  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${formId}/messages`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages),
      },
    );

    if (!response.ok) {
      // Try to get error details from response
      let errorDetails = '';
      try {
        const errorData = await response.json();
        errorDetails = JSON.stringify(errorData);
      } catch (e) {
        // If we can't parse the response as JSON, use the status text
        errorDetails = response.statusText;
      }

      throw new Error(
        `Failed to update custom messages: ${response.status} ${errorDetails}`,
      );
    }

    log(`Successfully updated custom messages for form ${formId}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating custom messages: ${error.message}`);
    } else {
      throw new Error(`Unknown error occurred while updating custom messages`);
    }
  }
};
