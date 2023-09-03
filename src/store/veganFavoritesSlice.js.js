// veganFavoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const veganFavoritesSlice = createSlice({
  name: 'veganFavorites',
  initialState,
  reducers: {
    addToVeganFavorites: (state, action) => {
      const recipeId = action.payload;
      if (!state.includes(recipeId)) {
        state.push(recipeId);
        localStorage.setItem('veganFavorites', JSON.stringify(state));
      }
    },
    removeFromVeganFavorites: (state, action) => {
      const recipeId = action.payload;
      const index = state.indexOf(recipeId);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem('veganFavorites', JSON.stringify(state));
      }
    },
    initializeVeganFavorites: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  addToVeganFavorites,
  removeFromVeganFavorites,
  initializeVeganFavorites,
} = veganFavoritesSlice.actions;

export default veganFavoritesSlice.reducer;
