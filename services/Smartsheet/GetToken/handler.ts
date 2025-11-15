import smartsheet from 'smartsheet';
import { GetTokenInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetTokenInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { outputVariable } = inputs;

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log('Getting current token information');

  try {
    const response = await client.tokens.getToken();
    log('Retrieved token information successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get token: ${error.message}`);
  }
};
