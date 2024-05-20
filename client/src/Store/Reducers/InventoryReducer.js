import { createSlice } from "@reduxjs/toolkit";
import {
  deleteItem,
  editItem,
  fetchItemByName,
  fetchItemList,
  postItem,
} from "../../Utils/inventory-api";

//Set the initial state for inventory store
//Item list contains list of item inventory. Loading and error are used as flags
const initialState = {
  loading: false,
  itemList: [],
  error: null,
};

//Create reducers for inventory. 
const InventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemList.pending, (state, action) => {
        state.loading = true;
      })
      //Get Item list from the database and set it to the itemlist state
      .addCase(fetchItemList.fulfilled, (state, action) => {
        state.loading = false;
        state.itemList = action.payload;
      })
      .addCase(fetchItemList.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(postItem.pending, (state, action) => {
        state.loading = true;
      })
      //Add new item to the database and update the state
      .addCase(postItem.fulfilled, (state, action) => {
        state.loading = false;
        state.itemList.push(action.payload);
      })
      .addCase(postItem.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(editItem.pending, (state, action) => {
        state.loading = true;
      })
      //Edit item and reflect the change in the db
      .addCase(editItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.itemList.findIndex(
          (item) => item.id === action.payload.id
        );
        state.itemList[index] = {
          ...state[index],
          ...action.payload,
        };
        console.log("state after edit", state.itemList[index]);
      })
      .addCase(editItem.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(deleteItem.pending, (state, action) => {
        state.loading = true;
      })
      //Delete item and update the state
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        let index = state.itemList.findIndex(({ id }) => id === action.payload.id);
        console.log("index in del", index);
        state.itemList.splice(index, 1);
        console.log("state after del", state);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })

      .addCase(fetchItemByName.pending, (state, action) => {
        state.loading = true;
      })
      //Get item up search query
      .addCase(fetchItemByName.fulfilled, (state, action) => {
        state.loading = false;
        state.itemList = action.payload;
        console.log("state after search", state.itemList);
      })
      .addCase(fetchItemByName.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      });
  },
});

export default InventorySlice.reducer;
