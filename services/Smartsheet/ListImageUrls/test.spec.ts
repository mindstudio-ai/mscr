import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('ListImageUrls executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    imageid: 'imageid-value',
    error: 'error-value',
    refid: 'refid-value',
    errorcode: 'errorcode-value',
    message: 'message-value',
    height: 'height-value',
    url: 'url-value',
    width: 'width-value',
    imageidValue: 'imageidValue-value',
    errorValue: 'errorValue-value',
    refidValue: 'refidValue-value',
    errorcodeValue: 'errorcodeValue-value',
    messageValue: 'messageValue-value',
    heightValue: 'heightValue-value',
    urlValue: 'urlValue-value',
    widthValue: 'widthValue-value',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});
