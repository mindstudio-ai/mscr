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

  const { imageId, outputVariable } = inputs;
  if (!imageId) {
    throw new Error('Image ID is required');
  }

  log(`Preparing to delete image with ID: ${imageId}`);

  try {
    const response = await fetch(`https://api.typeform.com/images/${imageId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Image with ID ${imageId} not found`);
      } else if (response.status === 401 || response.status === 403) {
        throw new Error(
          'Authentication failed. Please check your credentials.',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Failed to delete image: ${response.status} ${response.statusText}`,
        );
      }
    }

    log('Image deleted successfully');
    setOutput(outputVariable, 'Image deleted successfully');
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
