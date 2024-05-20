import * as recipeService from '../service/recipe.js';


//Controller to create new recipe 
export const create  = async(req, res) =>{
    try{
        let recipe = req.body;
        let savedRecipe = await recipeService.save(recipe)
        setResponse(savedRecipe,res)
    }
    catch(err){
        setError(err, res);
    }
}


//Controller to list recipes
export const list = async(req, res)=>{
    try{
        const recipes = await recipeService.list()
        setResponse(recipes, res);
    }
    catch(err){
        setError(err, res);
    }
}

//Controller to update recipe 
export const update = async (req,res) =>{
    try{
        const id = req.params.id;
        const updatedRecipe = {...req.body}
        updatedRecipe.id = id;
        const recipe = await recipeService.update(updatedRecipe)
        setResponse(recipe, res);
    }
    catch(err){
        console.log(err)
        setError(err, res);
    }
}

//Controller to search for recipes
export const search = async(req, res) => {
    try{
        let query = req.body;
        const recipe = await recipeService.find(query);
        setResponse(recipe,res)

    }
    catch(err){
        setError(err,res)
    }
}

//Controller to find a recipe by Id
export const findRecipeById = async(req, res) => {
    try{
        const id = req.params.id;
        let query = {}
        query._id = id;
        console.log(query)
        const recipe = await recipeService.find(query);
        setResponse(recipe[0],res)

    }
    catch(err){
        setError(err,res)
    }
}

//Controller to delete a recipe
export const del = async(req, res)=>{
    try{
        const id = req.params.id;
        const delRecipe = recipeService.del(id)
        setResponse({message:"Successfully deleted"}, res);
    }
    catch(err){
        setError(err, res)
    }
}

//Controller to add comment to the recipe
export const comment = async(req, res)=>{
    console.log('comment input id ', req.params.id )
    console.log('comment body ', req.body )
    try{
        const recipeId = req.params.id;
        const content = req.body;
        let comment = await recipeService.comment(content, recipeId)
        setResponse(comment, res)
    }
    catch(err){
        console.log('comment error',err)
        setError(err, res)
    }
}

//Controller to like a recipe
export const like = async(req, res)=>{
    try{
        const recipeId = req.params.id;
        const userId = req.body.userId;
        let like = await recipeService.like(userId, recipeId)
        setResponse(like, res)
    }
    catch(err){
        setError(err, res)
    }
}

//Controller to unlike a recipe
export const unlike = async(req, res)=>{
    try{
        const recipeId = req.params.id;
        const userId = req.body.userId;
        console.log('user',userId)
        const recipes = await recipeService.unlike(userId, recipeId)
        setResponse(recipes, res);
    }
    catch(err){
        setError(err, res);
    }
}

//This sets the response 
const setResponse = (obj, response) =>{
    response.status(200);
    response.json(obj);
}

//This sets the error response
const setError = (err, response)=>{
    console.log('err',err)
    response.status(500);
    response.json(err);
}
