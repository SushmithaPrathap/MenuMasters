import { createSlice } from '@reduxjs/toolkit'
import { getGroceyAsync, addGroceryAsync, deleteTodoAsync } from '../../Utils/grocery-api';

const initialState = {
  loading: false,
  list: [],
  error: null,
};
  
  const recipeSlice = createSlice({
    name: 'grocery',
    initialState,
    reducers: {},
    extraReducers: {
        //Get grocery list from the database
        //If the state is pending then set the loading flag
        [getGroceyAsync.pending]: (state, action) => {
          state.loading = true;
        },
        [getGroceyAsync.fulfilled]: (state, action) => {
          state.loading = false;
          state.list = action.payload;
        },
        [getGroceyAsync.rejected]: (state, action) => {
          state.loading = false;
          state.error = "Loading Issue";
        },
        //Add new grocery to the list
        [addGroceryAsync.fulfilled]: (state, action) => {
          state.loading = false;
          state.list.push(action.payload);
        },
        //Delete grocery from the list
        [deleteTodoAsync.fulfilled]: (state, action) => {
          state.loading = false;
          console.log('deleteGrocery reducer', action.payload)
          state.list = action.payload;
        }
    }
  })
  
  export default recipeSlice.reducer
  