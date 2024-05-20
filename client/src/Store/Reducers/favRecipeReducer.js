import { createSlice } from '@reduxjs/toolkit'
import { getFavRecipesAsync,addFavRecipeAsync, removeFavRecipeAsync } from '../../Utils/recipe-api';

//Set the initial state for fav recipe
//list contains the recipes and the loading and error are used as flags
const initialState = {
  loading: false,
  list: [],
  error: null,
};
  
//Create reducers for fav recipe
  const recipeSlice = createSlice({
    name: 'recipeFav',
    initialState,
    reducers: {},
    extraReducers: {
        //Get fav recipe list from the database
        //If the state is pending then set the loading flag
        [getFavRecipesAsync.pending]: (state, action) => {
          state.loading = true;
        },
        //When the request is full filled, set the state
        [getFavRecipesAsync.fulfilled]: (state, action) => {
          state.loading = false;
          state.list = action.payload;
        },
        [getFavRecipesAsync.rejected]: (state, action) => {
          state.loading = false;
          state.error = "Loading Issue";
        },
        //Add new recipe to fav list
        [addFavRecipeAsync.fulfilled]: (state, action) => {
          state.loading = false;
          state.list = action.payload;
        },[removeFavRecipeAsync.fulfilled]: (state, action) => {
          state.loading = false;
          state.list = action.payload;
        }
    }
  })
  
  export default recipeSlice.reducer
  