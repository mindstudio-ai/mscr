import { readFile } from 'node:fs/promises';
import YAML from 'yaml';

export async function readYaml<T>(path: string): Promise<T> {
  const text = await readFile(path, 'utf8');
  return YAML.parse(text);
}
