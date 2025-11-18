import { DeleteDiscussionInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: DeleteDiscussionInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, discussionId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!discussionId) {
    throw new Error('Discussion ID is required');
  }

  log(`Deleting discussion ${discussionId}`);

  try {
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/sheets/${sheetId}/discussions/${discussionId}`,
    });
    log('Discussion deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedDiscussionId: discussionId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete discussion: ${error.message}`);
  }
};
