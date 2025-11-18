import { ListReportsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListReportsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { modifiedSince, outputVariable } = inputs;

  log('Listing all reports');

  try {
    const queryParams: Record<string, string> = {};
    if (modifiedSince) {
      queryParams.modifiedSince = modifiedSince;
    }

    const response = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: '/reports',
      queryParams,
    });
    const data = (response as any).data || response;
    const totalCount =
      (response as any).totalCount || (Array.isArray(data) ? data.length : 0);
    log(`Found ${totalCount} report(s)`);
    setOutput(outputVariable, {
      totalCount,
      reports: data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list reports: ${error.message}`);
  }
};
