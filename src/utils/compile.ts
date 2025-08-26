// src/utils/compile.ts
import { build } from 'esbuild';
import path from 'node:path';

export type CompileResult = {
  code: string;
  map?: string;
  metafile?: any;
};

export async function compileTsFile(entryFile: string): Promise<string> {
  const result = await build({
    entryPoints: [entryFile],
    bundle: false,
    platform: 'node',
    format: 'esm',
    minify: true,
    write: false,
    target: 'es2020',
  });

  return result.outputFiles[0].text;
}
