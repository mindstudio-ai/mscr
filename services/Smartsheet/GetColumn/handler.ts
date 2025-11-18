import { GetColumnInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetColumnInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, columnId, level, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!columnId) {
    throw new Error('Column ID is required');
  }

  log(`Getting column ${columnId} from sheet ${sheetId}`);

  try {
    const queryParams: Record<string, number> = {};
    if (level !== undefined) {
      queryParams.level = level;
    }

    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/sheets/${sheetId}/columns/${columnId}`,
      queryParams,
    });
    log(`Retrieved column: ${(response as any).title}`);
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get column: ${error.message}`);
  }
};
