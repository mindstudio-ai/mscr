import { UpdateColumnInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<UpdateColumnInputs>) => {
  const { sheetId, columnId, title, index, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!columnId) {
    throw new Error('Column ID is required');
  }

  log(`Updating column ${columnId}`);

  try {
    const updateBody: any = {};
    if (title) {
      updateBody.title = title;
    }
    if (index !== undefined && index !== '') {
      updateBody.index = parseInt(index, 10);
    }

    const response = await smartsheetApiRequest({
      method: 'PUT',
      path: `/sheets/${sheetId}/columns/${columnId}`,
      body: updateBody,
    });
    log('Successfully updated column');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to update column: ${error.message}`);
  }
};
