import express, { Router } from "express";
import * as todoController from '../controller/groceryList.js'

const route = express.Router();

//This route is used to create todo item
route.post('/grocery/create',todoController.create);

//This route is used to list all todo item
route.get('/grocery/list',todoController.list)

//This route is used to update todo item by id
route.put('/grocery/update/:id', todoController.update);

//This route is used to delete todo item by id
route.delete('/grocery/delete/:id',todoController.del)

route.put('/grocery/mark/:id',todoController.completed)

export default route;
