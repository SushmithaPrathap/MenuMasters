import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getFavRecipesAsync } from '../../Utils/recipe-api';
import MediaCard from './RecipeReviewCard';
import "./explore.scss";
import RecipeComp from '../Homepage/RecipeComp';


const FavRecipe = () => {

  const dispatch = useDispatch();

  //All recipe state
  let recipeState = useSelector((state) => {
    return state["recipes"]
  }) ;

  let recipeList =  recipeState.list

  //User state
  let user = useSelector((state) => state.user) ;
  console.log('home')
  console.log('user homepage user',user.user.name);

  //Fav Recipes state setup
  let favRecipeState = useSelector((state) => {
    return state["favRecipes"]
  }) ;
  console.log('fav recipes',favRecipeState)


  let allRecipeList =  favRecipeState.list;

  useEffect(() => {
    dispatch(getFavRecipesAsync());
  }, [dispatch]);

  console.log('all user fav list', allRecipeList)

  let userId = user.user._id;

  // userId ="123s"
  
  let userRecipe = []

  for(let i of allRecipeList){
      if(userId == i.userId ){
        userRecipe = i.recipes;
      }
  }

  let newRecipeList = []

  for(let i of recipeList){
    for(let j of userRecipe)
    {
      if(i._id == j ){
        newRecipeList.push(i)
      }
    }
    
  }

  console.log('fav new recipe list',newRecipeList)

  return (
    <div>
      <h1>Welcome {user.user.name}</h1>
      {
        newRecipeList.map((recipe)=>(
          // <p>
          //     {recipe.name}
          // </p>
          // <MediaCard 
          //               id= {recipe._id}
          //               title = {recipe.name}
          //               description = {recipe.description}/>
          
              <RecipeComp item={recipe} />

                        
        ))
      }
    </div>
  )
}

export default FavRecipe