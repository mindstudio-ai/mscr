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
  log(`Listing contents of folder ${folderId}`);

  try {
    const response = await client.folders.getFolder({ folderId });
    const sheets = response.sheets || [];
    const folders = response.folders || [];
    const reports = response.reports || [];
    const sights = response.sights || [];

    log(
      `Found ${sheets.length} sheet(s), ${folders.length} folder(s), ${reports.length} report(s), ${sights.length} sight(s)`,
    );
    setOutput(outputVariable, {
      sheets,
      folders,
      reports,
      sights,
      totalCount:
        sheets.length + folders.length + reports.length + sights.length,
    });
  } catch (error: any) {
    throw new Error(`Failed to list folder contents: ${error.message}`);
  }
};
