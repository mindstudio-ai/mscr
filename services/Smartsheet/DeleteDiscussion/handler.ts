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
  const { sheetId, discussionId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!discussionId) {
    throw new Error('Discussion ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Deleting discussion ${discussionId}`);

  try {
    await client.sheets.deleteDiscussion({ sheetId, discussionId });
    log('Discussion deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedDiscussionId: discussionId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete discussion: ${error.message}`);
  }
};
