import smartsheet from 'smartsheet';
import { ListWorkspacesInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListWorkspacesInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { includeAll, outputVariable } = inputs;

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log('Listing workspaces...');

    const options: any = {};
    if (includeAll) {
      options.queryParameters = { includeAll: true };
    }

    const result = await client.workspaces.listWorkspaces(options);

    log(`Successfully retrieved ${result.totalCount} workspaces`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error listing workspaces: ${error.message}`);
    throw error;
  }
};
