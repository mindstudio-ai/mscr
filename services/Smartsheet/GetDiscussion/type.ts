export interface GetDiscussionInputs {
  sheetId: string;
  discussionId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
