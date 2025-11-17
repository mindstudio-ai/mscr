import fetch from 'node-fetch';

import { GetReportInputs } from './type';
import { IHandlerContext } from '../type';
import { BASE_URL } from '../constants';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetReportInputs>) => {
  const { reportId, outputVariable } = inputs;

  if (!reportId) {
    throw new Error('Report ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const url = `${BASE_URL}/reports/${reportId}`;
  log(`Getting report ${reportId}`);

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
    log('Retrieved report successfully');
    setOutput(outputVariable, result);
  } catch (error: any) {
    throw new Error(`Failed to get report: ${error.message}`);
  }
};
