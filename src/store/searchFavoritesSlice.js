import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const searchFavoritesSlice = createSlice({
  name: 'searchFavorites',
  initialState,
  reducers: {
    addToSearchFavorites: (state, action) => {
      const recipeId = action.payload;
      if (!state.includes(recipeId)) {
        state.push(recipeId);
        localStorage.setItem('searchFavorites', JSON.stringify(state)); // Atualize o localStorage
      }
    },
    removeFromSearchFavorites: (state, action) => {
      const recipeId = action.payload;
      const index = state.indexOf(recipeId);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem('searchFavorites', JSON.stringify(state)); // Atualize o localStorage
      }
    },
    initializeSearchFavorites: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToSearchFavorites, removeFromSearchFavorites, initializeSearchFavorites } = searchFavoritesSlice.actions;
export default searchFavoritesSlice.reducer;
