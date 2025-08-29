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

  const { uploadMethod, imageUrl, base64Image, fileName, outputVariable } =
    inputs;

  // Validate required inputs based on upload method
  if (uploadMethod === 'url' && !imageUrl) {
    throw new Error('Image URL is required when using URL upload method.');
  }

  if (uploadMethod === 'base64' && !base64Image) {
    throw new Error(
      'Base64 image data is required when using Base64 upload method.',
    );
  }

  if (!fileName) {
    throw new Error('File name is required.');
  }

  // Prepare request payload based on upload method
  const payload: Record<string, string> = {
    file_name: fileName,
  };

  if (uploadMethod === 'url') {
    payload.url = imageUrl;
    log(`Uploading image from URL: ${imageUrl}`);
  } else {
    payload.image = base64Image;
    log('Uploading base64 encoded image');
  }

  try {
    // Make API request to Typeform
    const response = await fetch('https://api.typeform.com/images', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to upload image: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Get the image URL from the Location header
    const imageUrl = response.headers.get('Location');

    if (!imageUrl) {
      throw new Error('Image upload succeeded but no image URL was returned.');
    }

    log(`Image uploaded successfully: ${fileName}`);

    // Set the output variable with the image URL
    setOutput(outputVariable, imageUrl);
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
