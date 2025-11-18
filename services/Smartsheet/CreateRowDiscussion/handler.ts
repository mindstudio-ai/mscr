import { CreateRowDiscussionInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<CreateRowDiscussionInputs>) => {
  const { sheetId, rowId, title, commentText, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!rowId) {
    throw new Error('Row ID is required');
  }
  if (!title) {
    throw new Error('Discussion title is required');
  }
  if (!commentText) {
    throw new Error('Comment text is required');
  }

  log(`Creating discussion on row ${rowId}: ${title}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/rows/${rowId}/discussions`,
      body: {
        title,
        comment: { text: commentText },
      },
    });
    log('Row discussion created successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to create row discussion: ${error.message}`);
  }
};
