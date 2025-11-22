export interface AddFavoritesInputs {
  objectId?: number;
  type?: "folder"
  | "report"
  | "sheet"
  | "sight"
  | "template"
  | "workspace";
  outputVariable: string;
}
