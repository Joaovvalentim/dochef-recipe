import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const recipeId = action.payload;
      if (!state.includes(recipeId)) {
        state.push(recipeId);
        localStorage.setItem('favorites', JSON.stringify(state)); // Atualize o localStorage
      }
    },
    removeFromFavorites: (state, action) => {
      const recipeId = action.payload;
      const index = state.indexOf(recipeId);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(state)); // Atualize o localStorage
      }
    },
    initializeFavorites: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToFavorites, removeFromFavorites, initializeFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;