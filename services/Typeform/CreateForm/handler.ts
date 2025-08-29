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
    throw new Error('Missing authentication token');
  }

  // Parse boolean values from string inputs
  const isPublic = inputs.isPublic === 'true';
  const welcomeShowButton = inputs.welcomeShowButton === 'true';
  const thankYouShowButton = inputs.thankYouShowButton === 'true';
  const showShareIcons = inputs.showShareIcons === 'true';

  // Parse fields JSON
  let fields;
  try {
    // If fieldsJson is already parsed (as an array), use it directly
    fields = Array.isArray(inputs.fieldsJson)
      ? inputs.fieldsJson
      : JSON.parse(inputs.fieldsJson);
  } catch (error) {
    throw new Error(
      `Invalid fields JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  log('Building form configuration...');

  // Construct the request payload
  const formData = {
    title: inputs.title,
    settings: {
      language: inputs.language,
      is_public: isPublic,
      meta: {
        description: inputs.description || '',
      },
    },
    welcome_screens: [
      {
        title: inputs.welcomeTitle,
        properties: {
          description: inputs.welcomeDescription || '',
          show_button: welcomeShowButton,
          button_text: welcomeShowButton
            ? inputs.welcomeButtonText || 'Start'
            : undefined,
        },
      },
    ],
    fields: fields,
    thankyou_screens: [
      {
        title: inputs.thankYouTitle,
        properties: {
          show_button: thankYouShowButton,
          button_text: thankYouShowButton
            ? inputs.thankYouButtonText || ''
            : undefined,
          redirect_url: inputs.redirectUrl || '',
          share_icons: showShareIcons,
        },
      },
    ],
  };

  log('Sending request to Typeform API...');

  try {
    const response = await fetch('https://api.typeform.com/forms', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Typeform API error (${response.status}): ${errorText}`);
    }

    // Get the form ID from the Location header
    const locationHeader = response.headers.get('Location');
    const formId = locationHeader ? locationHeader.split('/').pop() : '';

    if (!formId) {
      throw new Error('Could not retrieve form ID from response');
    }

    log(`Form created successfully with ID: ${formId}`);

    // Construct the form URL
    const formUrl = `https://form.typeform.com/to/${formId}`;

    // Set the output with form data
    setOutput(inputs.outputVariable, {
      id: formId,
      url: formUrl,
      title: inputs.title,
    });
  } catch (error) {
    log('Failed to create form');
    throw new Error(
      `Error creating form: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
