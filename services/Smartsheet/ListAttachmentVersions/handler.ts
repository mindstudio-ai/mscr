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
  log(`Listing versions for attachment ${attachmentId}`);

  try {
    const response = await client.sheets.listAttachmentVersions({
      sheetId,
      attachmentId,
    });
    log(`Found ${response.data?.length || 0} version(s)`);
    setOutput(outputVariable, {
      totalCount: response.totalCount,
      versions: response.data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list versions: ${error.message}`);
  }
};
