import { GetDiscussionInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetDiscussionInputs>) => {
  const { sheetId, discussionId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!discussionId) {
    throw new Error('Discussion ID is required');
  }

  log(`Getting discussion ${discussionId}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/sheets/${sheetId}/discussions/${discussionId}`,
    });
    log('Retrieved discussion successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get discussion: ${error.message}`);
  }
};
