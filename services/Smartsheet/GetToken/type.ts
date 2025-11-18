export interface GetTokenInputs {
  client_id: string;
  client_secret?: string;
  code?: string;
  grant_type: string;
  hash?: string;
  refresh_token?: string;
  redirect_url?: string;
  outputVariable: string;
}

export interface GetTokenQueryParameters {
  client_id: string;
  client_secret?: string;
  code?: string;
  grant_type: string;
  hash?: string;
  refresh_token?: string;
  redirect_url?: string;
}
