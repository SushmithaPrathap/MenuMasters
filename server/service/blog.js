import mongoose from "mongoose";
import Blog from "../model/Blog.js";

//Service file for blog

export const get = (id) => {
    const todo = Blog.findById(id).exec();
    return todo;
}

export const list = async() =>{
    let blogList = await Blog.find();
    return blogList;
}

export const save = async(blog) => {
   let newBlog = new Blog(blog);
   return await newBlog.save();
}

export const del = async(id) =>{
    let blog = await Blog.findByIdAndDelete(id);
    return blog;
}

export const update = async(recipe) =>{
    const updateBlog = Blog.findByIdAndUpdate(recipe.id, recipe, {new: true });
    return updateBlog;
}

export const find = async(query) =>{
    const blog = Blog.find(query);
    return blog;
}

