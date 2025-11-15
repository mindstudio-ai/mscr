import smartsheet from 'smartsheet';
import { SetSheetPublishInputs, PublishSettings, BooleanValue } from './type';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<SetSheetPublishInputs>) => {
  const { sheetId, outputVariable, ...publishSettings } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Setting publish status for sheet ${sheetId}`);

  try {
    // Get current publish status to preserve existing values
    const savedValues = await client.sheets.getPublishStatus({ sheetId });

    // Only use fields defined in PublishSettings interface
    const allowedKeys: (keyof PublishSettings)[] = [
      'icalEnabled',
      'readOnlyFullAccessibleBy',
      'readOnlyFullEnabled',
      'readOnlyLiteEnabled',
      'readOnlyLiteAccessibleBy',
      'readWriteEnabled',
    ];

    // Filter publishSettings to only include allowed keys with non-empty values
    const givenValues = {};
    for (const key of allowedKeys) {
      const value = savedValues[key];
      if (value !== undefined && value !== '') {
        if (value === 'true') {
          givenValues[key] = true as BooleanValue;
        } else if (value === 'false') {
          givenValues[key] = false as BooleanValue;
        } else {
          givenValues[key] = value as BooleanValue;
        }
      }
    }

    const filteredPublishSettings = Object.fromEntries(
      Object.entries(publishSettings).filter(([key, value]) => value !== ''),
    );

    // Merge with saved values (given values take precedence)
    const publishBody = { ...givenValues, ...filteredPublishSettings };

    const response = await client.sheets.setPublishStatus({
      sheetId,
      body: publishBody,
    });
    log('Publish status set successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to set publish status: ${error.message}`);
  }
};
