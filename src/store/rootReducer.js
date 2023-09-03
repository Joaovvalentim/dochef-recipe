// rootReducer.js
import { combineReducers } from 'redux';
import favoritesReducer from './favoriteSlice'; // Importe o reducer que você definiu
import veganFavoritesReducer from './veganFavoritesSlice.js'; // Importe o novo reducer

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  veganFavorites: veganFavoritesReducer, // Adicione o slice de veganFavorites
  // Outros reducers, se houverem
});

export default rootReducer;
