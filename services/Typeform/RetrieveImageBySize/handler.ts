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

  const { imageId, imageSize, responseFormat, outputVariable } = inputs;

  if (!imageId) {
    throw new Error('Image ID is required');
  }

  // Validate image size
  const validSizes = ['default', 'mobile', 'thumbnail'];
  if (!validSizes.includes(imageSize)) {
    throw new Error(
      `Invalid image size: ${imageSize}. Valid options are: default, mobile, thumbnail`,
    );
  }

  // API URL for retrieving image by size
  const url = `https://api.typeform.com/images/${imageId}/image/${imageSize}`;

  log(`Retrieving image ${imageId} with size ${imageSize}`);

  try {
    // Set headers based on response format
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    if (responseFormat === 'json') {
      headers['Accept'] = 'application/json';
    }

    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Image not found: ${imageId}`);
      } else if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Typeform connection settings.',
        );
      } else {
        throw new Error(
          `Failed to retrieve image: ${response.status} ${response.statusText}`,
        );
      }
    }

    // Process the response based on the requested format
    if (responseFormat === 'json') {
      // Return JSON metadata
      const jsonData = (await response.json()) as any;
      log('Successfully retrieved image metadata');
      setOutput(outputVariable, jsonData);
    } else {
      // Return binary image data
      const imageBuffer = Buffer.from(await response.arrayBuffer());

      // Get content type from response headers or default to image/jpeg
      const contentType = response.headers.get('content-type') || 'image/jpeg';

      log('Successfully retrieved image binary data');

      // Upload the image and get a URL
      const imageUrl = await uploadFile(imageBuffer, contentType);
      log('Image uploaded successfully');

      setOutput(outputVariable, imageUrl);
    }
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
