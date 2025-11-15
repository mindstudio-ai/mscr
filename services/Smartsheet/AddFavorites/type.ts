export interface FavoriteItem {
  type: string;
  objectId: number;
}

export interface AddFavoritesInputs {
  favoritesJson: string | FavoriteItem[];
  outputVariable: string;
}
