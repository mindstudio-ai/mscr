export interface CreateWebhookInputs {
  name: string;
  callbackUrl: string;
  scope: string;
  scopeObjectId: string;
  events: string | string[];
  version?: number;
  outputVariable: string;
}

export interface WebhookSpec {
  name: string;
  callbackUrl: string;
  scope: string;
  scopeObjectId: number;
  events: string[];
  version?: number;
}
