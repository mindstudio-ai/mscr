import { ShareSightInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ShareSightInputs>) => {
  const {
    sightId,
    email,
    accessLevel,
    sendEmail,
    accessApiLevel,
    outputVariable,
  } = inputs;

  if (!sightId) {
    throw new Error('Sight ID is required');
  }
  if (!email) {
    throw new Error('Email address is required');
  }
  if (!accessLevel) {
    throw new Error('Access level is required');
  }

  log(`Sharing dashboard ${sightId} with ${email}`);

  try {
    const queryParams: Record<string, boolean | number> = {};
    if (sendEmail !== undefined) {
      queryParams.sendEmail = sendEmail;
    }
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sights/${sightId}/shares`,
      queryParams,
      body: {
        email,
        accessLevel: accessLevel.toUpperCase(),
      },
    });
    log('Dashboard shared successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to share dashboard: ${error.message}`);
  }
};
