export interface IsFavoriteInputs {
  favoriteType: string;
  favoriteId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
