import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a typeform and returns form ID', async () => {
  process.env.token = process.env.TYPEFORM_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    title: 'Test Form',
    description: 'A test form created via API',
    language: 'en',
    isPublic: 'true',
    welcomeTitle: 'Welcome to the test form',
    welcomeDescription: 'This is a test form created via API',
    welcomeShowButton: 'true',
    welcomeButtonText: 'Start',
    fieldsJson:
      '[{"ref":"field_1","title":"What is your name?","type":"short_text"}]',
    thankYouTitle: 'Thank you for completing the form',
    thankYouShowButton: 'false',
    thankYouButtonText: '',
    redirectUrl: '',
    showShareIcons: 'false',
    outputVariable: 'formData',
  });

  expect(ctx.outputs.formData).toBeTruthy();
  expect(ctx.outputs.formData.id).toBeTruthy();
  expect(ctx.outputs.formData.url).toBeTruthy();
});
