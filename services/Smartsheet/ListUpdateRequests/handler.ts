import smartsheet from 'smartsheet';
import { ListUpdateRequestsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListUpdateRequestsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Listing update requests for sheet ${sheetId}`);

  try {
    const response = await client.sheets.listUpdateRequests({ sheetId });
    const requests = response.data || [];
    log(`Found ${requests.length} update request(s)`);
    setOutput(outputVariable, {
      totalCount: requests.length,
      updateRequests: requests,
    });
  } catch (error: any) {
    throw new Error(`Failed to list update requests: ${error.message}`);
  }
};
