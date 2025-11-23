export interface ListDiscussionAttachmentsInputs {
  sheetId: string;
  discussionId: string;
  includeAll?: boolean;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
