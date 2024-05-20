import express from 'express'
import * as recipeController from '../controller/favRecipe.js'

const router = express.Router();

router.post('/fav_recipe/add_recipe', recipeController.addRecipeToList);

router.post('/fav_recipe/remove_recipe', recipeController.removeRecipeToList);

router.post('/fav_recipe/create', recipeController.create);

router.get('/fav_recipe/list', recipeController.list);

router.post('/fav_recipe/search', recipeController.search);

router.put('/fav_recipe/update/:id', recipeController.update);

router.delete('/fav_recipe/delete/:id', recipeController.del)

export default router
