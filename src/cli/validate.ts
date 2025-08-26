import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFile } from 'node:fs/promises';
import { glob } from '../utils/fs.js';
import { readYaml } from '../utils/yaml.js';
import chalk from 'chalk';

async function loadSchema(p: string) {
  return JSON.parse(await readFile(p, 'utf8'));
}

async function main() {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);

  const serviceSchema = await loadSchema('schema/service.schema.json');
  const actionSchema = await loadSchema('schema/action.schema.json');
  const validateService = ajv.compile(serviceSchema);
  const validateAction = ajv.compile(actionSchema);

  const serviceFiles = await glob('services/*/service.yaml');
  const actionFiles = await glob('services/*/*/connector.yaml');

  let errors = 0;

  for (const file of serviceFiles) {
    const obj = await readYaml<any>(file);
    const valid = validateService(obj);
    if (!valid) {
      console.log(chalk.red(`❌ ${file}`));
      console.log(validateService.errors);
      errors++;
    } else {
      console.log(chalk.green(`✅ ${file}`));
    }
  }

  for (const file of actionFiles) {
    const obj = await readYaml<any>(file);
    const valid = validateAction(obj);
    if (!valid) {
      console.log(chalk.red(`❌ ${file}`));
      console.log(validateAction.errors);
      errors++;
    } else {
      console.log(chalk.green(`✅ ${file}`));
    }
  }

  if (errors > 0) {
    console.error(chalk.red(`\nValidation failed with ${errors} file(s).`));
    process.exit(1);
  } else {
    console.log(chalk.green('\nAll YAML files are valid.'));
  }
}
main();
