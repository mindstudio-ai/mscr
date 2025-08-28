import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

// Mock the WooCommerce API client
vi.mock('@woocommerce/woocommerce-rest-api', () => {
  return {
    default: class WooCommerceRestApi {
      constructor() {}
      delete() {
        return Promise.resolve({
          data: {
            slug: 'test-slug',
            name: 'Test Tax Class',
            _links: {
              collection: [
                { href: 'https://example.com/wp-json/wc/v3/taxes/classes' },
              ],
            },
          },
        });
      }
    },
  };
});

test('deletes tax class and saves output to variable', async () => {
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_key';
  process.env.consumerSecret = 'test_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    slug: 'test-slug',
    confirmDeletion: 'yes',
    outputVariable: 'deletedTaxClass',
  });

  expect(ctx.outputs['deletedTaxClass']).toBeTruthy();
  expect(ctx.outputs['deletedTaxClass'].slug).toBe('test-slug');
});

test('throws error when deletion is not confirmed', async () => {
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_key';
  process.env.consumerSecret = 'test_secret';

  const { handler } = await import('./handler.ts');

  await expect(
    runConnector(handler, {
      slug: 'test-slug',
      confirmDeletion: 'no',
      outputVariable: 'deletedTaxClass',
    }),
  ).rejects.toThrow('Deletion not confirmed');
});
