import { GetTokenInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

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
  const {
    client_id,
    client_secret,
    code,
    grant_type,
    hash,
    refresh_token,
    redirect_url,
    outputVariable,
  } = inputs;

  log('Getting or refreshing access token');

  try {
    // Build query parameters for OAuth token exchange
    const queryParams: Record<string, string> = {
      client_id,
      grant_type,
    };
    if (client_secret) {
      queryParams.client_secret = client_secret;
    }
    if (code) {
      queryParams.code = code;
    }
    if (hash) {
      queryParams.hash = hash;
    }
    if (refresh_token) {
      queryParams.refresh_token = refresh_token;
    }
    if (redirect_url) {
      queryParams.redirect_url = redirect_url;
    }

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: '/token',
      queryParams,
    });
    log('Retrieved token information successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get token: ${error.message}`);
  }
};
