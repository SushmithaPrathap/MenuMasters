import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../Reducers/authReducer";
import recipeReducer from "../Reducers/recipeReducer";
import inventoryReducer from "../Reducers/InventoryReducer";
import mealReducer from "../Reducers/mealReducer";
import recipeDetailReducer from "../Reducers/recipeDetailReducer";
import favRecipeReducer from "../Reducers/favRecipeReducer";
import groceryReducer from "../Reducers/groceryReducer";

//Set up the store for the application and import the reducers
const store = configureStore({
  reducer: {
    user: userReducer,
    recipes: recipeReducer,
    inventory: inventoryReducer,
    meal: mealReducer,
    recipeDetail: recipeDetailReducer,
    favRecipes: favRecipeReducer,
    grocery: groceryReducer
  },
});

export default store;
