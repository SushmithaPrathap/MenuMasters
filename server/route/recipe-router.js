import express from 'express'
import * as recipeController from '../controller/recipe.js'
import upload from '../service/upload.js'

const router = express.Router();

router.post('/recipe/create', recipeController.create);

router.get('/recipe/list', recipeController.list);

router.post('/recipe/search', recipeController.search);

router.put('/recipe/update/:id', recipeController.update);

router.delete('/recipe/delete/:id', recipeController.del);

router.post('/recipe/:id/comment', recipeController.comment)

router.get('/recipe/:id', recipeController.findRecipeById)

router.post('/recipe/:id/like', recipeController.like)

router.post('/recipe/:id/unlike', recipeController.unlike)

router.post('/upload', upload.single('upload'), function (req, res, next) {
    let fileData = req.file;
    console.log('Uploaded!', fileData);

    try{
        res.send(fileData);
    }
    catch(err){
        res.send(err)
    }
    
});

export default router
