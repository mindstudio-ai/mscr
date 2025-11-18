import { GetCrossSheetReferenceInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetCrossSheetReferenceInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, crossSheetReferenceId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!crossSheetReferenceId) {
    throw new Error('Cross-sheet Reference ID is required');
  }

  log(`Getting cross-sheet reference ${crossSheetReferenceId}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/sheets/${sheetId}/crosssheetreferences/${crossSheetReferenceId}`,
    });
    log('Retrieved cross-sheet reference successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get cross-sheet reference: ${error.message}`);
  }
};
