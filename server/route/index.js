import recipeRoute from "./recipe-router.js";
import authRoute from "./auth-router.js";
import customRecipeRoute from "./custom-recipe-route.js";
import favRecipeRoute from "./fav-recipe-router.js";
import emailAuth from "./email-auth-router.js";
import blogRoute from "./blog-router.js";
import inventoryRoute from "./inventory-router.js";
import groceryRoute from './grocery-router.js';
import mealRouter from './meal-router.js';

export default (app) => {
  app.use("/", recipeRoute);
  app.use("/", authRoute);
  app.use("/", customRecipeRoute);
  app.use("/", favRecipeRoute);
  app.use("/", emailAuth);
  app.use("/", blogRoute);
  app.use("/", inventoryRoute);
  app.use("/", groceryRoute);
  app.use("/", mealRouter);
};
