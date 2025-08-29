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

  const { themeId, outputVariable } = inputs;
  if (!themeId) {
    throw new Error('Theme ID is required');
  }

  log(`Retrieving theme information for theme ID: ${themeId}`);

  try {
    // Make request to Typeform API to retrieve theme details
    const response = await fetch(`https://api.typeform.com/themes/${themeId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      log(
        `Error response from Typeform API: ${response.status} ${response.statusText}`,
      );

      if (response.status === 404) {
        throw new Error(
          `Theme with ID ${themeId} not found. Please check the theme ID and try again.`,
        );
      } else if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Typeform connection settings.',
        );
      } else {
        throw new Error(`Failed to retrieve theme: ${errorText}`);
      }
    }

    const themeData = (await response.json()) as any;
    log(`Successfully retrieved theme: ${themeData.name || 'Unnamed theme'}`);

    // Set the output with the theme data
    setOutput(outputVariable, themeData);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving the theme');
  }
};
