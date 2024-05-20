import { createSlice } from "@reduxjs/toolkit";
import {
  getAllMeals,
  getAvail,
  getMealByDate,
  postMeal,
} from "../../Utils/meal-api";

//Set the initial state for tracting feature
const initialState = {
  loading: false,
  list: [],
  availList: [],
  dayMeal: [],
  error: null,
};

//Create reducer for the tracker
const mealSlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postMeal.pending, (state, action) => {
        state.loading = true;
      })
      //Add meal and update the state
      .addCase(postMeal.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(postMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(getAvail.pending, (state, action) => {
        state.loading = true;
      })
      //Get meals and update the state
      .addCase(getAvail.fulfilled, (state, action) => {
        state.loading = false;
        state.availList = action.payload;
      })
      .addCase(getAvail.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(getMealByDate.pending, (state, action) => {
        state.loading = true;
      })
      //Get the meals by date and update the state
      .addCase(getMealByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.dayMeal = action.payload;
      })
      .addCase(getMealByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      //Get all the meals
      .addCase(getAllMeals.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAllMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      });
  },
});

export default mealSlice.reducer;
