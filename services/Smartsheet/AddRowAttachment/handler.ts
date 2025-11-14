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
  const { sheetId, rowId, attachmentType, filePath, url, outputVariable } =
    inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!rowId) {
    throw new Error('Row ID is required');
  }
  if (attachmentType === 'LINK' && !url) {
    throw new Error('URL is required for LINK attachments');
  }
  if (attachmentType === 'FILE' && !filePath) {
    throw new Error('File path is required for FILE attachments');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Adding ${attachmentType} attachment to row ${rowId}`);

  try {
    let response;
    if (attachmentType === 'LINK') {
      response = await client.rows.addAttachment({
        sheetId,
        rowId,
        body: { attachmentType: 'LINK', url },
      });
    } else {
      response = await client.rows.attachFile({
        sheetId,
        rowId,
        file: filePath,
      });
    }
    log(`Successfully added attachment with ID: ${response.result.id}`);
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to add row attachment: ${error.message}`);
  }
};
