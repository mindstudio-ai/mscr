# MindStudio Connector Registry (MSCR)

The **MindStudio Connector Registry (MSCR)** is an open-source repository of TypeScript connectors and configuration interface definitions. These connectors allow you to integrate with popular services through a consistent request/response model.

---

## Request a Connector

If you’d like to see a new connector added, you can request one here:  
[Request a Connector](https://gainful-quark-807.notion.site/25cb0c63a7ff8074a965cb9a53449d82?pvs=105)

---

## Project Structure

- **/services**  
  Contains one folder per service. Each service includes:
  - `service.yml` – service definition  
  - Subfolders for individual actions. Each action includes:  
    - `connector.yml` – connector definition  
    - `handler.ts` – action handler  
    - `readme.md` – documentation  
    - `test.spec.ts` – tests  

- **/schema**  
  Generated service and action schemas for validation.  
  Regenerate with: `npm run generate-schemas`

* **/src**
  Utilities for building and validating the registry.

---

## Development Scripts

| Script                   | Command                        | Description                                     |
| ------------------------ | ------------------------------ | ----------------------------------------------- |
| **Generate Schemas**     | `npm run generate-schemas`     | Regenerates validation schemas in `/schema`.    |
| **Validate**             | `npm run validate`             | Validates service and connector definitions.    |
| **Test**                 | `npm run test`                 | Runs the test suite using Vitest.               |
| **Lint**                 | `npm run lint`                 | Runs ESLint across the codebase.                |
| **Lint & Fix**           | `npm run lint:fix`             | Lints and auto-fixes code style issues.         |
| **Format**               | `npm run format`               | Formats files with Prettier.                    |
| **Format Check**         | `npm run format:check`         | Verifies formatting without applying changes.   |
| **Build Registry**       | `npm run build`                | Compiles the registry.                          |

---

## Contributing

### Adding a Connector

1. Create a new directory under `/services`.
2. Add a `service.yml` file.
3. Add one or more connectors, each with:

   * `connector.yml`
   * `handler.ts`
   * `readme.md`
   * `test.spec.ts`
4. Submit a pull request.

Community contributions are welcome!

---

## Generation Agent

A MindStudio agent is available to assist in creating new connectors:
[Connector Generation Agent](https://app.mindstudio.ai/agents/mscr-autogen-8f89a531/remix)
