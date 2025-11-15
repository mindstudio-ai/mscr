export interface UpdateWebhookInputs {
  webhookId: string;
  name?: string;
  enabled?: boolean;
  events?: string[];
  callbackUrl?: string;
  outputVariable: string;
}
