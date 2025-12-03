export interface CreateWebhookInputs {
  callbackUrl?: string;
  events?: string;
  name?: string;
  version?: string;
  scope?: string;
  scopeObjectId?: string;
  outputVariable: string;
}
