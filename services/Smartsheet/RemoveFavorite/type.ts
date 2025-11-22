export interface RemoveFavoriteInputs {
  favoriteType: "folder"
  | "report"
  | "sheet"
  | "sight"
  | "template"
  | "workspace";
  favoriteId: number;
  outputVariable: string;
}
