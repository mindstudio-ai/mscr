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
      'Missing authentication token. Please check your connection settings.',
    );
  }

  const {
    themeName,
    answerColor,
    backgroundColor,
    buttonColor,
    questionColor,
    font,
    fieldAlignment,
    fieldFontSize,
    screenAlignment,
    screenFontSize,
    transparentButton,
    roundedCorners,
    backgroundLayout,
    backgroundImageUrl,
    backgroundBrightness,
    outputVariable,
  } = inputs;

  // Build the theme payload
  const themePayload: any = {
    name: themeName,
    colors: {
      answer: answerColor,
      background: backgroundColor,
      button: buttonColor,
      question: questionColor,
    },
    font,
    fields: {
      alignment: fieldAlignment,
      font_size: fieldFontSize,
    },
    screens: {
      alignment: screenAlignment,
      font_size: screenFontSize,
    },
    has_transparent_button: transparentButton === 'true',
    rounded_corners: roundedCorners,
  };

  // Add optional background settings if provided
  if (
    backgroundLayout ||
    backgroundImageUrl ||
    backgroundBrightness !== undefined
  ) {
    themePayload.background = {};

    if (backgroundLayout) {
      themePayload.background.layout = backgroundLayout;
    }

    if (backgroundImageUrl) {
      themePayload.background.href = backgroundImageUrl;
    }

    if (backgroundBrightness !== undefined) {
      themePayload.background.brightness = parseFloat(backgroundBrightness);
    }
  }

  log(`Creating new theme: ${themeName}`);

  try {
    const response = await fetch('https://api.typeform.com/themes', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(themePayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to create theme: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    const themeData = (await response.json()) as any;
    log(`Successfully created theme "${themeName}" with ID: ${themeData.id}`);

    // Set the output variable with the theme data
    setOutput(outputVariable, themeData);
  } catch (error) {
    log(
      `Error creating theme: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
