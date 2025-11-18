import { GetShareInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetShareInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, shareId, accessApiLevel, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!shareId) {
    throw new Error('Share ID is required');
  }

  log(`Getting share ${shareId}`);

  try {
    const queryParams: Record<string, number> = {};
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }

    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/sheets/${sheetId}/shares/${shareId}`,
      queryParams,
    });
    log('Retrieved share successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get share: ${error.message}`);
  }
};
