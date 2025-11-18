import { UpdateGroupInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<UpdateGroupInputs>) => {
  const { groupId, name, description, outputVariable } = inputs;

  if (!groupId) {
    throw new Error('Group ID is required');
  }

  log(`Updating group ${groupId}`);

  try {
    const updateBody: any = {};
    if (name) {
      updateBody.name = name;
    }
    if (description !== undefined) {
      updateBody.description = description;
    }

    const response = await smartsheetApiRequest({
      method: 'PUT',
      path: `/groups/${groupId}`,
      body: updateBody,
    });
    log('Group updated successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to update group: ${error.message}`);
  }
};
