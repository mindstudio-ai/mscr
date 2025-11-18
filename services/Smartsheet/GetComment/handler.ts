import { GetCommentInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetCommentInputs>) => {
  const { sheetId, commentId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!commentId) {
    throw new Error('Comment ID is required');
  }

  log(`Getting comment ${commentId}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/sheets/${sheetId}/comments/${commentId}`,
    });
    log('Retrieved comment successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get comment: ${error.message}`);
  }
};
