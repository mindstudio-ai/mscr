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
  const { folderId, outputVariable } = inputs;

  if (!folderId) {
    throw new Error('Folder ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Listing child folders of folder ${folderId}`);

  try {
    const response = await client.folders.getFolder({ folderId });
    const folders = response.folders || [];
    log(`Found ${folders.length} child folder(s)`);
    setOutput(outputVariable, {
      totalCount: folders.length,
      folders,
    });
  } catch (error: any) {
    throw new Error(`Failed to list child folders: ${error.message}`);
  }
};
