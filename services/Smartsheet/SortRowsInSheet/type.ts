export interface SortRowsInSheetInputs {
  sheetId: string;
  includeExclude?: string;
  sortcriteria?: any[];
  outputVariable: string;
}

export interface SortRowsInSheetQueryParameters {
  includeExclude?: string;
}
