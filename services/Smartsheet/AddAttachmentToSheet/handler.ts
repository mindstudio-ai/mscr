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
  const { sheetId, attachmentType, filePath, url, name, outputVariable } =
    inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
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

  log(`Adding ${attachmentType} attachment to sheet: ${sheetId}`);

  try {
    let response;

    if (attachmentType === 'LINK') {
      response = await client.sheets.addAttachment({
        sheetId,
        body: {
          attachmentType: 'LINK',
          url,
          name: name || url,
        },
      });
    } else {
      response = await client.sheets.attachFileToSheet({
        sheetId,
        file: filePath,
        fileName: name,
      });
    }

    log(`Successfully added attachment with ID: ${response.result.id}`);

    setOutput(outputVariable, response.result);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (error.statusCode === 404) {
      throw new Error(`Sheet not found: ${sheetId}`);
    } else if (error.statusCode === 403) {
      throw new Error('Permission denied. Editor access required.');
    } else {
      throw new Error(`Failed to add attachment: ${errorMessage}`);
    }
  }
};
