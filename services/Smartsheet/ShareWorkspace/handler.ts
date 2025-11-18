import { ShareWorkspaceInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ShareWorkspaceInputs>) => {
  const { workspaceId, shares, sendEmail, message, outputVariable } = inputs;

  if (!workspaceId) {
    throw new Error('Workspace ID is required');
  }

  if (!shares || !Array.isArray(shares) || shares.length === 0) {
    throw new Error('Shares array is required');
  }

  try {
    log(`Sharing workspace ${workspaceId}...`);

    const body = shares.map((share: any) => {
      if (message) {
        return { ...share, message };
      }
      return share;
    });

    const queryParams: Record<string, boolean | number> = {};
    if (sendEmail !== undefined) {
      queryParams.sendEmail = sendEmail;
    }
    if (inputs.accessApiLevel !== undefined) {
      queryParams.accessApiLevel = inputs.accessApiLevel;
    }

    const result = await smartsheetApiRequest({
      method: 'POST',
      path: `/workspaces/${workspaceId}/shares`,
      body,
      queryParams,
    });

    log(`Successfully shared workspace with ${shares.length} users/groups`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error sharing workspace: ${error.message}`);
    throw error;
  }
};
