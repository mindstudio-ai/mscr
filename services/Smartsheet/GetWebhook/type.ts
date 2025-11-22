export interface GetWebhookInputs {
  webhookId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
