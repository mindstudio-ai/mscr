export interface UpdateWebhookInputs {
  webhookId: string;
  callbackUrl?: string;
  events?: string;
  name?: string;
  version?: string;
  enabled?: string;
  outputVariable: string;
}
