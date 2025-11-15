import smartsheet from 'smartsheet';
import { CreateGroupInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: CreateGroupInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { name, description, memberEmails, outputVariable } = inputs;

  if (!name) {
    throw new Error('Group name is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Creating group: ${name}`);

  try {
    const groupBody: any = { name };
    if (description) {
      groupBody.description = description;
    }
    if (memberEmails) {
      const emails = memberEmails.split(',').map((e: string) => e.trim());
      groupBody.members = emails.map((email: string) => ({ email }));
    }

    const response = await client.groups.createGroup({ body: groupBody });
    log('Group created successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to create group: ${error.message}`);
  }
};
