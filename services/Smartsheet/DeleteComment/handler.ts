import { DeleteCommentInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: DeleteCommentInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, commentId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!commentId) {
    throw new Error('Comment ID is required');
  }

  log(`Deleting comment ${commentId}`);

  try {
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/sheets/${sheetId}/comments/${commentId}`,
    });
    log('Comment deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedCommentId: commentId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete comment: ${error.message}`);
  }
};
