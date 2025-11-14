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
  const { outputVariable } = inputs;

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log('Listing Home content');

  try {
    const response = await client.home.listContents();
    const folders = response.folders || [];
    const sheets = response.sheets || [];
    const reports = response.reports || [];
    const sights = response.sights || [];
    const workspaces = response.workspaces || [];

    log(
      `Found ${sheets.length} sheets, ${folders.length} folders, ${reports.length} reports, ${sights.length} sights, ${workspaces.length} workspaces`,
    );
    setOutput(outputVariable, {
      folders,
      sheets,
      reports,
      sights,
      workspaces,
      totalCount:
        folders.length +
        sheets.length +
        reports.length +
        sights.length +
        workspaces.length,
    });
  } catch (error: any) {
    throw new Error(`Failed to list Home content: ${error.message}`);
  }
};
