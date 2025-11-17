import fetch from 'node-fetch';

import { GetFolderInputs } from './type';
import { IHandlerContext } from '../type';
import { BASE_URL } from '../constants';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetFolderInputs>) => {
  const { folderId, outputVariable } = inputs;

  if (!folderId) {
    throw new Error('Folder ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  log(`Getting folder ${folderId}`);
  const url = `${BASE_URL}/folders/${folderId}`;
  try {
    log(`Fetching folder ${url}`);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    log(`Response: ${JSON.stringify(response)}`);
    const result = await response.json();

    // Check for errors
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          'Authentication failed. Please check your API Key and Account URL.',
        );
      }
    }
    log('Retrieved folder successfully');
    setOutput(outputVariable, result);
  } catch (error: any) {
    throw new Error(`Failed to get folder: ${error.message}`);
  }
};
