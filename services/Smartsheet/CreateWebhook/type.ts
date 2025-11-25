export interface CreateWebhookInputs {
  name: string;
  callbackUrl: string;
  scope: string;
  scopeObjectId: string;
  events: string;
  version?: number;
  outputVariable: string;
}
