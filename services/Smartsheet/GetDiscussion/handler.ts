import { GetDiscussionInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetDiscussionInputs;
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
