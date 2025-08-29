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
    throw new Error('Missing authentication token');
  }

  const {
    themeId,
    name,
    answerColor,
    backgroundColor,
    buttonColor,
    questionColor,
    font,
    roundedCorners,
    transparentButton,
    fieldsAlignment,
    fieldsFontSize,
    screensAlignment,
    screensFontSize,
    backgroundImageUrl,
    backgroundLayout,
    backgroundBrightness,
    outputVariable,
  } = inputs;

  // Construct the theme payload
  const themePayload: Record<string, any> = {
    name,
    font,
    rounded_corners: roundedCorners,
    has_transparent_button: transparentButton === 'true',
    colors: {
      answer: answerColor,
      background: backgroundColor,
      button: buttonColor,
      question: questionColor,
    },
    fields: {
      alignment: fieldsAlignment,
      font_size: fieldsFontSize,
    },
    screens: {
      alignment: screensAlignment,
      font_size: screensFontSize,
    },
  };

  // Add background settings if provided
  if (backgroundImageUrl || backgroundLayout || backgroundBrightness) {
    themePayload.background = {};

    if (backgroundImageUrl) {
      themePayload.background.href = backgroundImageUrl;
    }

    if (backgroundLayout) {
      themePayload.background.layout = backgroundLayout;
    }

    if (backgroundBrightness) {
      themePayload.background.brightness = parseFloat(backgroundBrightness);
    }
  }

  log(`Updating theme "${name}" with ID: ${themeId}`);

  try {
    const response = await fetch(`https://api.typeform.com/themes/${themeId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(themePayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update theme: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const result = (await response.json()) as any;
    log(`Theme "${result.name}" updated successfully`);

    setOutput(outputVariable, result);
  } catch (error) {
    log(
      `Error updating theme: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
