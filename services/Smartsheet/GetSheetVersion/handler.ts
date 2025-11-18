import { GetSheetVersionInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetSheetVersionInputs>) => {
  const { sheetId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Getting version for sheet ${sheetId}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/sheets/${sheetId}/version`,
    });
    log(`Sheet version: ${(response as any).version}`);
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get sheet version: ${error.message}`);
  }
};
