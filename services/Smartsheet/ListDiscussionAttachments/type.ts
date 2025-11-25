export interface ListDiscussionAttachmentsInputs {
  sheetId: string;
  discussionId: string;
  page?: number;
  pagesize?: number;
  includeall?: boolean;
  outputVariable: string;
}
