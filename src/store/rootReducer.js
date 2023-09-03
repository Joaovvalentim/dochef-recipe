import { combineReducers } from '@reduxjs/toolkit';
import favoritesReducer from './favoriteSlice'; // Corrija o nome da importação
import veganFavoritesSlice from './veganFavoritesSlice.js';
import searchFavoritesSlice from './searchFavoritesSlice';

const rootReducer = combineReducers({
  favorites: favoritesReducer, // Corrija o nome da chave aqui
  veganFavorites: veganFavoritesSlice,
  searchFavorites: searchFavoritesSlice,
  // Outros reducers, se houverem
});

export default rootReducer;