import { combineReducers } from 'redux';
import favoritesReducer from './favoriteSlice'; // Importe o reducer que você definiu

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  // Outros reducers, se houverem
});

export default rootReducer;