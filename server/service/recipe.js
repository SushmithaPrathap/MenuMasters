import { query } from "express";
import mongoose from "mongoose";
import Recipe from '../model/Recipe.js'
import Comment from '../model/Comment.js'

export const list = async() =>{
    let recipeList = await Recipe.find();
    return recipeList;
}

export const save = async(recipe) => {
    let newRecipe = new Recipe(recipe);
    return await newRecipe.save();
}

export const del = async(id) =>{
    let recipe = await Recipe.findByIdAndDelete(id);
    return recipe;
}

export const update = async(recipe) =>{
    const updatedRecipe = Recipe.findByIdAndUpdate(recipe.id, recipe);
    return updatedRecipe;
}

export const find = async(query) =>{
    const recipe = Recipe.find(query);
    return recipe;
}

export const comment = async(com, recipeId) =>{
    let newComment = new Comment(com);
    let savedComment = await newComment.save();
    let recipe  = await Recipe.findById(recipeId) 
    recipe.comments.unshift(savedComment)
    let newRec = await recipe.save()
    return newComment;
} 

export const like = async (userId, recipeId) =>{
    let recipe  = await Recipe.findById(recipeId) 
    if(!userId){
        userId = "Anon"
    }
    recipe.likes.push(userId)
    let newRec = await recipe.save()
    return newRec
}

export const unlike = async (userId, recipeId) =>{
    let recipe  = await Recipe.findById(recipeId) 
    if(!userId){
        userId = "Anon"
    }

    const newRecipe = recipe.likes.filter(function (recLike) {
        return recLike !== userId;
    });

    console.log('new recipe', newRecipe)
    recipe.likes = newRecipe;

    let newRec = await recipe.save()
    return newRec
}
