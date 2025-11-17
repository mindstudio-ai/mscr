import { GetSheetSummaryInputs } from './type';
import { BASE_URL } from '../constants';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetSheetSummaryInputs>) => {
  const { sheetId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }
  const url = `${BASE_URL}/sheets/${sheetId}/summary`;
  log(`Getting sheet summary for sheet ${sheetId}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const result = await response.json();

    // Check for errors
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          'Authentication failed. Please check your API Key and Account URL.',
        );
      }
    }

    log('Retrieved sheet summary successfully');
    setOutput(outputVariable, result);
  } catch (error: any) {
    throw new Error(`Failed to get sheet summary: ${error.message}`);
  }
};
