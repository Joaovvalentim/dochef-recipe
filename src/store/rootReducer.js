import { combineReducers } from '@reduxjs/toolkit';
import favoritesReducer from './favoriteSlice'; 
import veganFavoritesSlice from './veganFavoritesSlice.js';
import searchFavoritesSlice from './searchFavoritesSlice';

const rootReducer = combineReducers({
  favorites: favoritesReducer, 
  veganFavorites: veganFavoritesSlice,
  searchFavorites: searchFavoritesSlice,

});

export default rootReducer;