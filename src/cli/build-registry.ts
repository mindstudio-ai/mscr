import { readFile, writeFile } from 'node:fs/promises';
import { mkdirp } from 'mkdirp';
import { existsSync } from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { glob } from '../utils/fs.js';
import { readYaml } from '../utils/yaml.js';
import * as mimeTypes from 'mime-types';
import { compileTsFile } from '../utils/compile.js';

async function fileToBase64(p: string): Promise<string> {
  const mimeType = mimeTypes.lookup(p) || 'image/png';
  const buf = await readFile(p);
  return `data:${mimeType};base64,${buf.toString('base64')}`;
}

async function main() {
  try {
    console.log(chalk.cyan('🔍 Scanning service definitions...'));
    const serviceFiles = await glob('services/*/service.yml');
    const services = [];

    for (const servicePath of serviceFiles) {
      const dir = path.dirname(servicePath);
      const service = await readYaml<any>(servicePath);

      const iconPath = path.join(dir, service?.metadata?.icon ?? 'icon.png');
      const icon = existsSync(iconPath) ? await fileToBase64(iconPath) : null;
      service.metadata.icon = icon;

      const actionFiles = await glob(path.join(dir, '*/connector.yml'));
      const actions = [];

      for (const actionPath of actionFiles) {
        const actionDir = path.dirname(actionPath);
        const action = await readYaml<any>(actionPath);

        const helpPath = path.join(
          actionDir,
          action?.metadata?.quickHelp ?? 'help.md',
        );
        const handlerPath = path.join(actionDir, 'handler.ts');

        const help = existsSync(helpPath)
          ? await readFile(helpPath, 'utf8')
          : '';
        action.metadata.quickHelp = help;

        const handler = existsSync(handlerPath)
          ? await compileTsFile(handlerPath)
          : '';

        actions.push({
          ...action,
          handler,
        });

        console.log(
          chalk.green('✔ Loaded action: ') +
            chalk.bold(action.metadata?.name ?? actionPath),
        );
      }

      services.push({
        definition: service,
        actions,
      });

      console.log(
        chalk.green('✔ Loaded service: ') +
          chalk.bold(service.metadata?.name ?? servicePath),
      );
    }

    const registry = {
      apiVersion: 'v1',
      generatedAt: new Date().toISOString(),
      services,
    };

    await mkdirp('dist');
    await writeFile('dist/registry.json', JSON.stringify(registry, null, 2));

    console.log(
      chalk.bgGreen.black(' DONE ') +
        ' ' +
        chalk.green('dist/registry.json generated successfully'),
    );
  } catch (err) {
    console.error(
      chalk.bgRed.white(' ERROR '),
      chalk.red(err instanceof Error ? err.message : String(err)),
    );
    process.exit(1);
  }
}

main();
