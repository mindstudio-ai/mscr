export interface ListDiscussionAttachmentsInputs {
  sheetId: string;
  discussionId: string;
  page?: number;
  pagesize?: number;
  includeall?: boolean;
  outputVariable: string;
}

export interface ListDiscussionAttachmentsQueryParameters {
  page?: number;
  pagesize?: number;
  includeall?: boolean;
}
