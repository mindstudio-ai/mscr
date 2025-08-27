import { readFile, writeFile } from 'node:fs/promises';
import { mkdirp } from 'mkdirp';
import { existsSync } from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { glob } from '../utils/fs.js';
import { readYaml } from '../utils/yaml.js';
import { compileTsFile } from '../utils/compile.js';

const sym = {
  info: 'ℹ️',
  pkg: '📦',
  ok: '✔',
  fail: '✖',
  dot: '•',
  end: '🏁',
};

const log = {
  headline: (msg: string) =>
    console.log('\n' + chalk.cyan.bold(`${sym.info} ${msg}`)),
  service: (name: string) =>
    console.log(
      chalk.cyanBright(`${sym.pkg} Packaging service: `) + chalk.bold(name),
    ),
  action: (name: string) =>
    console.log(
      '  ' + chalk.gray('├─ ') + chalk.green(`${sym.ok} `) + chalk.dim(name),
    ),
  serviceDone: (name: string, count: number) =>
    console.log(
      '  ' +
        chalk.gray('└─ ') +
        chalk.greenBright(`${count} action${count === 1 ? '' : 's'} packaged`) +
        chalk.dim(`  (${name})`),
    ),
  summary: (services: number, actions: number, outPath: string) =>
    console.log(
      `\n${chalk.bgGreen.black(' DONE ')} ${chalk.green('Registry generated successfully')}\n` +
        chalk.gray(`${sym.dot} Services: `) +
        chalk.white(services.toString()) +
        '\n' +
        chalk.gray(`${sym.dot} Actions:  `) +
        chalk.white(actions.toString()) +
        '\n' +
        chalk.gray(`${sym.dot} Output:   `) +
        chalk.white(outPath) +
        ' ' +
        sym.end +
        '\n',
    ),
  start: (msg: string) => console.log(chalk.cyan(`${sym.info} ${msg}`)),
  error: (err: unknown) =>
    console.error(
      chalk.bgRed.white(` ERROR `),
      chalk.red(err instanceof Error ? err.message : String(err)),
    ),
};

async function main() {
  const t0 = Date.now();

  try {
    log.headline('Scanning service definitions…');
    const serviceFiles = await glob('services/*/service.yml');

    let totalActions = 0;
    const services: Array<{
      definition: any;
      actions: any[];
    }> = [];

    for (const servicePath of serviceFiles) {
      const dir = path.dirname(servicePath);
      const service = await readYaml<any>(servicePath);
      const serviceName = service?.metadata?.name ?? servicePath;

      log.service(serviceName);

      const actionFiles = await glob(path.join(dir, '*/connector.yml'));
      const actions: any[] = [];

      for (const actionPath of actionFiles) {
        const actionDir = path.dirname(actionPath);
        const action = await readYaml<any>(actionPath);

        // Set source path
        action.source = actionDir.replace('services/', '');

        // Resolve quick help
        const helpPath = path.join(
          actionDir,
          action?.metadata?.quickHelp ?? 'readme.md',
        );
        const handlerPath = path.join(actionDir, 'handler.ts');

        const help = existsSync(helpPath)
          ? await readFile(helpPath, 'utf8')
          : '';
        action.metadata.quickHelp = help;

        // Resolve code handler
        const handler = existsSync(handlerPath)
          ? await compileTsFile(handlerPath)
          : '';

        const actionName = action?.metadata?.name ?? actionPath;

        actions.push({ ...action, handler });

        log.action(actionName);
      }

      services.push({ definition: service, actions });
      totalActions += actions.length;

      log.serviceDone(serviceName, actions.length);
    }

    const registry = {
      apiVersion: 'v1',
      generatedAt: new Date().toISOString(),
      services,
    };

    const outPath = 'dist/registry.json';
    await mkdirp('dist');
    await writeFile(outPath, JSON.stringify(registry, null, 2));

    const elapsed = Date.now() - t0;
    log.summary(services.length, totalActions, outPath);
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
}

main();
