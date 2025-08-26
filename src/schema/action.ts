import { z } from 'zod';

const SelectOption = z.object({
  label: z.string(),
  value: z.string(),
});

const ConfigurationItem = z.object({
  label: z.string(),
  required: z.boolean().optional(),
  helpText: z.string().default(''),
  variable: z.string().min(1),
  type: z.enum(['text', 'outputVariableName', 'select']),
  placeholder: z.string().optional(),
  defaultValue: z.string().optional(),
  selectOptions: z.object({ options: z.array(SelectOption).min(1) }).optional(),
  textOptions: z
    .object({
      type: z.enum(['default', 'multiline', 'markdown']).default('default'),
    })
    .optional(),
});

export const ActionDefinition = z.object({
  apiVersion: z.literal('v1'),
  kind: z.literal('Action'),
  id: z.string().min(1),
  serviceId: z.string().min(1),
  active: z.boolean(),
  metadata: z.object({
    name: z.string(),
    description: z.string().default(''),
    quickHelp: z.string().min(1), // path to help.md
  }),
  configuration: z
    .array(
      z.object({
        title: z.string(),
        collapsed: z.boolean().optional(),
        items: z.array(ConfigurationItem).min(1),
      }),
    )
    .min(1),
});

export type TActionDefinition = z.infer<typeof ActionDefinition>;
