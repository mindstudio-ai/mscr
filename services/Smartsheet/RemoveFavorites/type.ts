export interface RemoveFavoritesInputs {
  favoriteType: "folder"
  | "report"
  | "sheet"
  | "sight"
  | "template"
  | "workspace";
  objectIds: string;
  outputVariable: string;
}
