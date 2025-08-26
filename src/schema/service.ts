import { z } from 'zod';

export const ServiceConfigurationItem = z.object({
  id: z.string().min(1),
  type: z.enum(['apiKey', 'plaintext']),
  name: z.string(),
  description: z.string().default(''),
  placeholder: z.string().default(''),
});

export const ServiceDefinition = z.object({
  apiVersion: z.literal('v1'),
  kind: z.literal('ServiceDefinition'),
  id: z.string().min(1),
  metadata: z.object({
    name: z.string(),
    description: z.string().default(''),
    icon: z.string().min(1), // relative path to file in same dir
  }),
  configuration: z.array(ServiceConfigurationItem).default([]),
});

export type TServiceDefinition = z.infer<typeof ServiceDefinition>;
