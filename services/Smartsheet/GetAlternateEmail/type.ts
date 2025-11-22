export interface GetAlternateEmailInputs {
  userId: string;
  alternateEmailId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
