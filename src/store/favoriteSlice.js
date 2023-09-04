// No seu favoriteSlice.js
import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      const { recipe } = action.payload;
      state.push(recipe);
    },
    removeFromFavorites: (state, action) => {
      const { recipeId } = action.payload;
      return state.filter((recipe) => recipe.id !== recipeId);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
