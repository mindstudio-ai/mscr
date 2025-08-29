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
  const { outputVariable } = inputs;

  if (!token) {
    throw new Error('Missing authentication token');
  }

  log('Retrieving images from your Typeform account...');

  try {
    const response = await fetch('https://api.typeform.com/images', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your token.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    }

    const images = (await response.json()) as any[];

    log(`Successfully retrieved ${images.length} images`);

    setOutput(outputVariable, images);
  } catch (error) {
    log(
      `Error retrieving images: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
