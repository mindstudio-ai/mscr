import { ListEventsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListEventsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    since,
    to,
    streamPosition,
    maxCount,
    numericDates,
    managedPlanId,
    outputVariable,
  } = inputs;

  log('Listing events');

  try {
    const queryParams: Record<string, string | number | boolean> = {};
    if (since) {
      queryParams.since = since;
    }
    if (to) {
      queryParams.to = to;
    }
    if (streamPosition) {
      queryParams.streamPosition = streamPosition;
    }
    if (maxCount !== undefined) {
      queryParams.maxCount = maxCount;
    }
    if (numericDates !== undefined) {
      queryParams.numericDates = numericDates;
    }
    if (managedPlanId !== undefined) {
      queryParams.managedPlanId = managedPlanId;
    }

    const response = await smartsheetApiRequest<{
      data: any[];
      moreAvailable?: boolean;
      nextStreamPosition?: number;
    }>({
      method: 'GET',
      path: '/events',
      queryParams,
    });
    const data = (response as any).data || response;
    log(`Found ${Array.isArray(data) ? data.length : 0} event(s)`);
    setOutput(outputVariable, {
      moreAvailable: (response as any).moreAvailable,
      nextStreamPosition: (response as any).nextStreamPosition,
      events: data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list events: ${error.message}`);
  }
};
