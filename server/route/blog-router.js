import express, { Router } from 'express';
import * as blogController from '../controller/blog.js'

const router = express.Router();

//Route for blog creation
router.post('/blog/create', blogController.createBlog);

//Route for blog list
router.get('/blog/list', blogController.list);

//Route for blog search
router.post('/blog/search', blogController.search);

//Route for get blog by id
router.get('/blog/:id', blogController.get);

//Route for blog update by id
router.put('/blog/update/:id', blogController.update);

//Route for blog delete by id
router.delete('/blog/delete/:id', blogController.del)

export default router;