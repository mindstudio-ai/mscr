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
  const { sheetId, attachmentId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!attachmentId) {
    throw new Error('Attachment ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Deleting all versions of attachment ${attachmentId}`);

  try {
    await client.sheets.deleteAllAttachmentVersions({
      sheetId,
      attachmentId,
    });
    log('Successfully deleted all attachment versions');
    setOutput(outputVariable, {
      success: true,
      deletedAttachmentId: attachmentId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete versions: ${error.message}`);
  }
};
