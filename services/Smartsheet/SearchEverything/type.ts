export interface SearchEverythingInputs {
  query: string;
  location?: string;
  modifiedsince?: string;
  include?: string;
  scopes?: string;
  scopesValue?: string;
  outputVariable: string;
}
