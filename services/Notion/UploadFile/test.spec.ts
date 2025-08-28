import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('uploads file to Notion and saves output', async () => {
  process.env.token = process.env.NOTION_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    fileUrl: 'https://example.com/sample.txt',
    filename: 'sample.txt',
    contentType: 'text/plain',
    mode: 'single_part',
    outputVariable: 'uploadResult',
  });

  expect(ctx.outputs['uploadResult']).toBeTruthy();
});
