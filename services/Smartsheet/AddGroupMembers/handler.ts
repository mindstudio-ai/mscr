import smartsheet from 'smartsheet';
import { AddGroupMembersInputs } from './type';

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

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Adding members to group ${groupId}`);

  try {
    const emails = memberEmails.split(',').map((e: string) => e.trim());
    const members = emails.map((email: string) => ({ email }));

    const response = await client.groups.addGroupMembers({
      groupId,
      body: members,
    });
    log(`Added ${emails.length} member(s) to group`);
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to add group members: ${error.message}`);
  }
};
