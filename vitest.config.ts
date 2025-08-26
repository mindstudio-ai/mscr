import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// Load env before tests start
dotenvExpand.expand(dotenv.config());

export default defineConfig({
  test: {
    include: ['services/**/**/test.spec.ts'],
    isolate: true, // per-test-module isolation
    globals: true, // use "test/expect" without imports if you want
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      all: false,
    },
    poolOptions: {
      threads: {
        singleThread: false,
      },
    },
  },
});
