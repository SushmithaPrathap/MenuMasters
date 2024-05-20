import * as todoService from '../service/groceryList.js'
;

//Used to create a new grocery item
export const create = async(req, res)=>{
    try{
        const todo = req.body;
        const savedTodo = await todoService.save(todo);
        setResponse(savedTodo, res);
    }
    catch(err){
        setError(err, res);
    }
}

//Used to list all the grocery items
export const list = async(req, res)=>{
    try{
        const listTodo = await todoService.lister();
        setResponse(listTodo, res);
    }
    catch(err){
        setError(err, res);
    }
    
}

export const completed = async(req, res)=>{
    try{
        const id = req.params.id;
        const listTodo = await todoService.completed(id);
        setResponse(listTodo, res);
    }
    catch(err){
        console.log(err)
        setError(err, res);
    }
    
}

//Used to update a grocery item
export const update = async (req,res) =>{
    try{
        const id = req.params.id;
        const updatedTodp = {...req.body}
        updatedTodp.id = id;
        const todo = await todoService.update(updatedTodp);
        setResponse(updatedTodp, res);
    }
    catch(err){
        console.log(err)
        // setError(err, res);
    }
}

//Used to delete a grocery item
export const del = async (req,res) =>{
    try{
        const id = req.params.id;
        const delTodo = await todoService.del(id);
        

        setResponse(delTodo, res);
    }
    catch(err){
        console.log(err)
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
    response.status(500);
    response.json(err);
}

