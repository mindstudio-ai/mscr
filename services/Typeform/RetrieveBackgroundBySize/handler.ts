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

  const { imageId, imageSize, responseFormat, outputVariable } = inputs;

  if (!imageId) {
    throw new Error('Image ID is required');
  }

  // Validate image size
  const validSizes = ['default', 'tablet', 'mobile', 'thumbnail'];
  if (!validSizes.includes(imageSize)) {
    throw new Error(
      `Invalid image size: ${imageSize}. Must be one of: ${validSizes.join(', ')}`,
    );
  }

  // Set the appropriate Accept header based on the response format
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (responseFormat === 'json') {
    headers.Accept = 'application/json';
  } else {
    headers.Accept = 'image/*';
  }

  const url = `https://api.typeform.com/images/${imageId}/background/${imageSize}`;

  log(`Retrieving ${imageSize} background image with ID: ${imageId}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Image not found with ID: ${imageId}`);
      } else if (response.status === 401 || response.status === 403) {
        throw new Error('Authentication error. Please check your API token.');
      } else {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    }

    if (responseFormat === 'json') {
      // Return JSON metadata
      const data = (await response.json()) as any;
      log(`Successfully retrieved image metadata for ${imageId}`);
      setOutput(outputVariable, data);
    } else {
      // Return binary image data
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Get content type from response headers
      const contentType = response.headers.get('content-type') || 'image/jpeg';

      log(`Successfully retrieved binary image data for ${imageId}`);
      log(`Uploading image with content type: ${contentType}`);

      // Upload the binary data and get a URL
      const imageUrl = await uploadFile(buffer, contentType);
      setOutput(outputVariable, imageUrl);

      log('Image upload complete');
    }
  } catch (error) {
    log(`Error retrieving background image: ${(error as Error).message}`);
    throw error;
  }
};
