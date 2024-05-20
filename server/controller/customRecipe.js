import * as recipeService from '../service/customRecipe.js'

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

export const list = async(req, res)=>{
    try{
        const recipes = await recipeService.list()
        setResponse(recipes, res);
    }
    catch(err){
        setError(err, res);
    }
}

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
