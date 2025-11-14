import smartsheet from 'smartsheet';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { filePath, altText, outputVariable } = inputs;

  if (!filePath) {
    throw new Error('File path is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Uploading cell image from: ${filePath}`);

  try {
    const body: any = { file: filePath };
    if (altText) {
      body.altText = altText;
    }

    const response = await client.images.uploadImage({ body });
    log(`Successfully uploaded image with ID: ${response.imageId}`);
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to upload cell image: ${error.message}`);
  }
};
