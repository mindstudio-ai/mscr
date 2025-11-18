import { GetSheetPublishInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetSheetPublishInputs>) => {
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
