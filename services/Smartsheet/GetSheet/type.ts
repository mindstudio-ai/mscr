export interface GetSheetInputs {
  sheetId: string;
  includeAttachments?: boolean;
  includeDiscussions?: boolean;
  includeRowPermalink?: boolean;
  outputVariable: string;
}

export interface GetSheetQueryParameters {
  include?: string;
}
