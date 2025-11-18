import { GetWorkspaceInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetWorkspaceInputs>) => {
  const { workspaceId, accessApiLevel, include, loadAll, outputVariable } =
    inputs;

  if (!workspaceId) {
    throw new Error('Workspace ID is required');
  }

  try {
    log(`Retrieving workspace ${workspaceId}...`);

    const queryParams: Record<string, boolean | string | number> = {};
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }
    if (include) {
      queryParams.include = include;
    }
    if (loadAll !== undefined) {
      queryParams.loadAll = loadAll;
    }

    const [workspaceMetadata, workspaceChildren] = await Promise.all([
      smartsheetApiRequest({
        method: 'GET',
        path: `/workspaces/${workspaceId}`,
        queryParams,
      }),
      smartsheetApiRequest({
        method: 'GET',
        path: `/workspaces/${workspaceId}/folders`,
        queryParams,
      }),
    ]);

    const output = {
      metadata: workspaceMetadata,
      children: workspaceChildren,
    };

    log(`Successfully retrieved workspace: ${(output.metadata as any).name}`);

    setOutput(outputVariable, output);
  } catch (error: any) {
    log(`Error getting workspace: ${error.message}`);
    throw error;
  }
};
