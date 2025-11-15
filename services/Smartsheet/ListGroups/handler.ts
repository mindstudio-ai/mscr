import smartsheet from 'smartsheet';
import { ListGroupsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListGroupsInputs;
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
  log('Listing all groups');

  try {
    const response = await client.groups.listGroups();
    log(`Found ${response.totalCount || 0} group(s)`);
    setOutput(outputVariable, {
      totalCount: response.totalCount,
      groups: response.data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list groups: ${error.message}`);
  }
};
