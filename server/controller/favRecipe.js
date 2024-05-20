import * as recipeService from '../service/favRecipe.js'

//Controller to add recipe to fav list
export const addRecipeToList = async(req, res)=>{
    try{
        let userId = req.body.userId;
        if(!userId){
            userId = "Anon"
        }
        let recipeId = req.body.recipeId;
        console.log('add recipe to fav', userId, recipeId)
        let updatedRecipe = await recipeService.addRecipeToList(userId, recipeId);
        setResponse(updatedRecipe, res)
    }
    catch(err){
        setError(err, res);
    }
}

//Controller to remove recipe from fav list
export const removeRecipeToList = async(req, res)=>{
    try{
        let userId = req.body.userId;
        if(!userId){
            userId = "Anon"
        }
        let recipeId = req.body.recipeId;
        console.log('remove recipe to fav', userId, recipeId)
        let updatedRecipe = await recipeService.removeRecipeToList(userId, recipeId);
        setResponse(updatedRecipe, res)
    }
    catch(err){
        setError(err, res);
    }
}

//Controller to create recipe
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

//Controller to list recipe
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

//Controller to search recipe
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

//Controller to Delete recipe
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
