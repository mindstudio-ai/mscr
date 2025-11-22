export interface IsFavoriteInputs {
  favoriteType: "folder"
  | "report"
  | "sheet"
  | "sight"
  | "template"
  | "workspace";
  favoriteId: number;
  include?: "directId" | "name";
  outputVariable: string;
}
