import { writeFile } from 'node:fs/promises';
import chalk from 'chalk';
import fromZodSchema from 'zod-to-json-schema';
import { ActionDefinition } from '../schema/action';
import { ServiceDefinition } from '../schema/service';

const withMeta = (schema: any, title: string) => ({
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: `https://mscr.mindstudio.ai/${title}`,
  title,
  ...schema,
});

async function main() {
  try {
    const service = fromZodSchema(ServiceDefinition);
    const action = fromZodSchema(ActionDefinition);

    await writeFile(
      'schema/service.schema.json',
      JSON.stringify(withMeta(service, 'ServiceDefinition'), null, 2),
    );
    console.log(
      chalk.green('✔ Wrote ') + chalk.bold('schema/service.schema.json'),
    );

    await writeFile(
      'schema/action.schema.json',
      JSON.stringify(withMeta(action, 'ActionDefinition'), null, 2),
    );
    console.log(
      chalk.green('✔ Wrote ') + chalk.bold('schema/action.schema.json'),
    );

    console.log(
      chalk.bgGreen.black(' DONE ') +
        ' ' +
        chalk.green('Schemas written to ') +
        chalk.bold('/schema'),
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
