export interface UpdateWebhookInputs {
  webhookId: string;
  name?: string;
  callbackUrl?: string;
  events?: string;
  enabled?: boolean;
  outputVariable: string;
}
