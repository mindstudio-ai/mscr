import { AddGroupMembersInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: AddGroupMembersInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { groupId, memberEmails, outputVariable } = inputs;

  if (!groupId) {
    throw new Error('Group ID is required');
  }
  if (!memberEmails) {
    throw new Error('Member emails are required');
  }

  log(`Adding members to group ${groupId}`);

  try {
    const emails = memberEmails.split(',').map((e: string) => e.trim());
    const members = emails.map((email: string) => ({ email }));

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/groups/${groupId}/members`,
      body: members,
    });
    log(`Added ${emails.length} member(s) to group`);
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to add group members: ${error.message}`);
  }
};
