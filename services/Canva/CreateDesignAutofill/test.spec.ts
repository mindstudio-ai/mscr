import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates design autofill job', async () => {
  // Mock the token in environment variables
  process.env.token = 'mock-token';

  // Import the handler
  const { handler } = await import('./handler.ts');

  // Mock response for fetch
  global.fetch = vi.fn().mockImplementation((url) => {
    if (url === 'https://api.canva.com/rest/v1/autofills') {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            job: {
              id: 'mock-job-id',
              status: 'success',
              result: {
                type: 'create_design',
                design: {
                  id: 'DAFVztcvd9z',
                  title: 'Test Design',
                  url: 'https://www.canva.com/design/DAFVztcvd9z/edit',
                  thumbnail: {
                    width: 595,
                    height: 335,
                    url: 'https://example.com/thumbnail.png',
                  },
                },
              },
            },
          }),
      });
    }
    return Promise.reject(new Error('Unexpected URL'));
  });

  // Run the connector
  const ctx = await runConnector(handler, {
    brandTemplateId: 'DAFVztcvd9z',
    title: 'Test Design',
    dataFields: {
      text_field: { type: 'text', text: 'Sample text' },
    },
    outputVariable: 'designOutput',
  });

  // Verify output was set
  expect(ctx.outputs.designOutput).toBeTruthy();
  expect(ctx.outputs.designOutput.design.id).toBe('DAFVztcvd9z');
});
