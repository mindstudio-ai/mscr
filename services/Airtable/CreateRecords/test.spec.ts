import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test(
  'creates a single record in Airtable',
  async () => {
    process.env.token = 'fake-token';

    const { handler } = await import('./handler.ts');
    const ctx = await runConnector(handler, {
      baseId: 'appABC123',
      tableIdOrName: 'Table1',
      recordData: { Name: 'Test Record', Notes: 'Created from test' },
      createMultiple: 'false',
      typecast: 'false',
      outputVariable: 'createdRecord',
    });

    expect(ctx.outputs['createdRecord']).toBeTruthy();
  },
  { timeout: 10000 },
);

test(
  'creates multiple records in Airtable',
  async () => {
    process.env.token = 'fake-token';

    const { handler } = await import('./handler.ts');
    const ctx = await runConnector(handler, {
      baseId: 'appABC123',
      tableIdOrName: 'Table1',
      recordData: [
        { fields: { Name: 'Test Record 1', Notes: 'First record' } },
        { fields: { Name: 'Test Record 2', Notes: 'Second record' } },
      ],
      createMultiple: 'true',
      typecast: 'false',
      outputVariable: 'createdRecords',
    });

    expect(ctx.outputs['createdRecords']).toBeTruthy();
  },
  { timeout: 10000 },
);
