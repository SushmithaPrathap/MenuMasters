import express from 'express'
import * as recipeController from '../controller/customRecipe.js'

const router = express.Router();

router.post('/custom_recipe/create', recipeController.create);

router.get('/custom_recipe/list', recipeController.list);

router.post('/custom_recipe/search', recipeController.search);

router.put('/custom_recipe/update/:id', recipeController.update);

router.delete('/custom_recipe/delete/:id', recipeController.del)

export default router
