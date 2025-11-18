import { GetSheetPublishInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetSheetPublishInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Getting publish status for sheet ${sheetId}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/sheets/${sheetId}/publish`,
    });
    log('Retrieved publish status successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get publish status: ${error.message}`);
  }
};
