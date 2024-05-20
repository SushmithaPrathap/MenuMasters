import { query } from "express";
import mongoose from "mongoose";
import Recipe from '../model/CustomRecipe.js'

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
