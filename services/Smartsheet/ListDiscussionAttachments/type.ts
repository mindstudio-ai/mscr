export interface ListDiscussionAttachmentsInputs {
  sheetId: string;
  discussionId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  filePath?: string;
  fileName?: string;
  outputVariable: string;
}
