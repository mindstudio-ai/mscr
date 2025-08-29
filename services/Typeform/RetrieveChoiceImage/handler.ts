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
  const { imageId, imageSize, responseFormat, outputVariable } = inputs;
  const { token } = process.env;

  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Typeform connection settings.',
    );
  }

  // Construct the request URL
  const url = `https://api.typeform.com/images/${imageId}/choice/${imageSize}`;

  // Set up headers based on the requested response format
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  // Only add Accept header for JSON requests
  if (responseFormat === 'json') {
    headers['Accept'] = 'application/json';
  }

  log(
    `Retrieving ${responseFormat === 'json' ? 'metadata for' : ''} image ${imageId} in ${imageSize} size...`,
  );

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to retrieve image: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    if (responseFormat === 'json') {
      // Handle JSON response
      const jsonData = (await response.json()) as any;
      log(
        `Successfully retrieved image metadata for ${jsonData.file_name || 'image'}`,
      );
      setOutput(outputVariable, jsonData);
    } else {
      // Handle binary response
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      log('Successfully retrieved image, uploading to storage...');

      // Upload the binary data and get the URL
      const imageUrl = await uploadFile(buffer, contentType);

      log('Image uploaded successfully');
      setOutput(outputVariable, imageUrl);
    }
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving the image');
  }
};
