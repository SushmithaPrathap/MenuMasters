import { createSlice } from "@reduxjs/toolkit";
import { getRecipesAsync } from "../../Utils";

//Set the initial state for the recipe
const initialState = {
  loading: false,
  list: [],
  error: null,
};

//Create reducers for the recipe
const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: {
    [getRecipesAsync.pending]: (state, action) => {
      state.loading = true;
    },
    //when the api is successful, then update the state
    [getRecipesAsync.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.list = action.payload.recipes;
    },
    [getRecipesAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Loading Issue";
    },
  },
});

export default recipeSlice.reducer;
