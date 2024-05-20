
import todo from '../model/groceryList.js'

//Service file for grocery list 
export const save = async(t) =>{
    // console.log('test',t)
    const newTodo = new todo(t);
    // console.log('sve',newTodo)
    return await newTodo.save();
}

export const search = async (query) =>{
    
    const todos = todo.find(query).exec();
    return todos;
}

//List all the todo itema
export const lister = async() =>{
    const todos = todo.find().exec();
    return todos;
}

export const update = async(newTodo) =>{
    //Update the updatedDate
    console.log('in service',newTodo)
    newTodo.updatedDate = new Date();
    //findByIdAndUpdate find a element by Id and updates it 
    const updatedTodo = todo.findByIdAndUpdate(newTodo.id, newTodo).exec();
    return updatedTodo;
}

export const completed = async(id) =>{
    console.log('in service',id)
    let updatedDate = new Date();
    //findByIdAndUpdate find a element by Id and updates it 
    let data = {
        "completed":true,
        "updatedDate": updatedDate
    }
    const updatedTodo = todo.findByIdAndUpdate(id, data).exec();
    return updatedTodo;
}

export const del = async(id) =>{
    // console.log('indel')
    //findByIdAndDelete find a element by Id and deletes it
    console.log('grocery list service id',id)
    const todoDel = todo.findByIdAndDelete(id).exec();
    return await todo.find();
    
}
