import * as blogService from '../service/blog.js';

export const createBlog = async(req, res) => {
    try{
        let blog = req.body;
        let createdBlog = await blogService.save(blog);
        setSuccessResponse(createdBlog,res);
    }
    catch(err){
        setErrorResponse(err,res);
    }
}

export const list = async(req, res)=>{
    try{
        const recipes = await blogService.list()
        setSuccessResponse(recipes, res);
    }
    catch(err){
        setErrorResponse(err, res);
    }
}

export const update = async (req,res) =>{
    try{
        const id = req.params.id;
        const updatedRecipe = {...req.body}
        updatedRecipe.id = id;
        const recipe = await blogService.update(updatedRecipe)
        setSuccessResponse(recipe, res);
    }
    catch(err){
        console.log(err)
        setErrorResponse(err, res);
    }
}

export const search = async(req, res) => {
    try{
        let query = req.body;
        const recipe = await blogService.find(query);
        setSuccessResponse(recipe,res)

    }
    catch(err){
        setErrorResponse(err,res)
    }
}

//Here we define the get method to retieve todos based on any id
export const get = async (request, response) => {
    try{
       const id = request.params.id;
       const todo = await blogService.get(id);
       setSuccessResponse(todo, response);
    }
    catch(error){
      setErrorResponse(error, response);
    }
  
  }

export const del = async(req, res)=>{
    try{
        const id = req.params.id;
        const delRecipe = blogService.del(id)
        setSuccessResponse({message:"Successfully deleted"}, res);
    }
    catch(err){
        setErrorResponse(err, res)
    }
}


const setSuccessResponse = (obj,response) => {
    response.status(200);
    response.json(obj);
}

const setErrorResponse = (err,response) => {
    console.log('err', err);
    response.status(500);
    response.json(err);
}