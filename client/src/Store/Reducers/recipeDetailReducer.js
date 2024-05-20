import { createSlice } from '@reduxjs/toolkit'
import { getRecipeByIdAsync, recipeCommentAsysn, recipeLikeAsync, recipeUnLikeAsync } from '../../Utils/recipe-api';


//Set the initial state for recipe detail
const initialState = {
  loading: false,
  content: {
    comments:[],
    likes: [],
    items:[]
    // name: "",
    // description: "",
    // duration: "",
    // nutrition:"",
    // type: "",
  },
  error: null,
};
  
//Create reducer for the recipe details
  const recipeSlice = createSlice({
    name: 'recipeDetail',
    initialState,
    reducers: {},
    extraReducers: {
      //Get recipe details by id
        [getRecipeByIdAsync.pending]: (state, action) => {
          state.loading = true;
        },
        //Update the state of recipe details when the api is successful
        [getRecipeByIdAsync.fulfilled]: (state, action) => {
          state.loading = false;
          console.log(action.payload)
          state.content = action.payload;
        },
        [getRecipeByIdAsync.rejected]: (state, action) => {
          state.loading = false;
          state.error = "Loading Issue";
        },
        //Add comment to the given recipe and update the state
        [recipeCommentAsysn.pending]: (state, action) => {
          state.loading = true;
        },
        [recipeCommentAsysn.fulfilled]: (state, action) => {
          state.loading = false;
          state.content.comments.push(action.payload);
        },
        [recipeCommentAsysn.rejected]: (state, action) => {
          state.loading = false;
          state.error = "Loading Issue";
        },
        //Add current user to the list of likes for a given recipe
        [recipeLikeAsync.pending]: (state, action) => {
          state.loading = true;
        },
        [recipeLikeAsync.fulfilled]: (state, action) => {
          state.loading = false;
          state.content = action.payload;
        },
        [recipeLikeAsync.rejected]: (state, action) => {
          state.loading = false;
          state.error = "Loading Issue";
        },
        //Remove current user from the list of likes for a given recipe
        [recipeUnLikeAsync.fulfilled]: (state, action) => {
          state.loading = false;
          state.content = action.payload;
        },
    }
  })
  
  export default recipeSlice.reducer
  