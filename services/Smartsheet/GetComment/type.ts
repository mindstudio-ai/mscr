export interface GetCommentInputs {
  sheetId: string;
  commentId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
