export interface IsFavoriteInputs {
  favoriteType: string;
  favoriteId: string;
  include?: string;
  outputVariable: string;
}

export interface IsFavoriteQueryParameters {
  include?: string;
}
