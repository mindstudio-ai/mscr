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
  const { sheetId, attachmentId, filePath, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!attachmentId) {
    throw new Error('Attachment ID is required');
  }
  if (!filePath) {
    throw new Error('File path is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Adding new version to attachment ${attachmentId}`);

  try {
    const response = await client.sheets.attachNewVersion({
      sheetId,
      attachmentId,
      file: filePath,
    });
    log(`Successfully added new version with ID: ${response.result.id}`);
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to add version: ${error.message}`);
  }
};
