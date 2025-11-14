import smartsheet from 'smartsheet';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
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

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Deleting comment ${commentId}`);

  try {
    await client.sheets.deleteComment({ sheetId, commentId });
    log('Comment deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedCommentId: commentId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete comment: ${error.message}`);
  }
};
