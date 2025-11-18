import { GetProofInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetProofInputs>) => {
  const { sheetId, proofId, include, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!proofId) {
    throw new Error('Proof ID is required');
  }

  log(`Getting proof ${proofId}`);

  try {
    const queryParams: Record<string, string> = {};
    if (include) {
      queryParams.include = include;
    }

    const result = await smartsheetApiRequest({
      method: 'GET',
      path: `/sheets/${sheetId}/proofs/${proofId}`,
      queryParams,
    });

    log('Retrieved proof successfully');
    setOutput(outputVariable, result);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';
    if (errorMessage.includes('403') || errorMessage.includes('Permission')) {
      throw new Error(
        'Permission denied. You may not have access to this proof.',
      );
    } else {
      throw new Error(`Failed to get proof: ${errorMessage}`);
    }
  }
};
