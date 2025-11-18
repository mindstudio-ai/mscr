import { CreateDiscussionInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<CreateDiscussionInputs>) => {
  const { sheetId, title, commentText, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!title) {
    throw new Error('Discussion title is required');
  }
  if (!commentText) {
    throw new Error('Comment text is required');
  }

  log(`Creating discussion: ${title}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/discussions`,
      body: {
        title,
        comment: { text: commentText },
      },
    });
    log('Discussion created successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to create discussion: ${error.message}`);
  }
};
