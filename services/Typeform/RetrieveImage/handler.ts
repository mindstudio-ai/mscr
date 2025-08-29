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
      'Missing authentication token. Please check your Typeform connection.',
    );
  }

  const { imageId, responseFormat, outputVariable } = inputs;

  if (!imageId) {
    throw new Error('Image ID is required');
  }

  // Set up request headers based on desired response format
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
  };

  if (responseFormat === 'json') {
    headers['Accept'] = 'application/json';
  }

  // Construct the API URL
  const url = `https://api.typeform.com/images/${imageId}`;

  log(`Retrieving image with ID: ${imageId}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Image with ID ${imageId} not found`);
      } else {
        throw new Error(
          `Failed to retrieve image: ${response.status} ${response.statusText}`,
        );
      }
    }

    if (responseFormat === 'json') {
      // Handle JSON metadata response
      const jsonData = (await response.json()) as any;
      log('Successfully retrieved image metadata');
      setOutput(outputVariable, jsonData);
    } else {
      // Handle binary image response
      const imageBuffer = Buffer.from(await response.arrayBuffer());

      // Determine MIME type from response headers or default to image/jpeg
      const contentType = response.headers.get('content-type') || 'image/jpeg';

      log('Successfully retrieved image, uploading...');

      // Upload the image and get the URL
      const imageUrl = await uploadFile(imageBuffer, contentType);

      log('Image successfully uploaded');
      setOutput(outputVariable, imageUrl);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving image: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while retrieving the image');
    }
  }
};
