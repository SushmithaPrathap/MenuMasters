import Recipe from '../model/FavRecipe.js'


//Service file for fav recipe
export const addRecipeToList = async(userId, recipeId) =>{
    let recipeList = await Recipe.find({userId:userId});

    console.log('Fav recipe list', recipeList)
    if(recipeList.length!=0){
        recipeList[0].recipes.push(recipeId)
        let res= await recipeList[0].save()
        return await Recipe.find();
    }
    else{
        let recList = {
            'userId':userId,
            'recipes':[recipeId]
        }
        let newRecipe = new Recipe(recList)
        let res= await newRecipe.save()
        return await Recipe.find();
    }

}

export const removeRecipeToList = async(userId, recipeId) =>{
    let recipeList = await Recipe.find({userId:userId});

    console.log('remove Fav recipe list', recipeList)
    if(recipeList.length!=0){

        const newRecipe = recipeList[0].recipes.filter(function (recLike) {
            return recLike !== recipeId;
        });

        recipeList[0].recipes = newRecipe;
        let res = await recipeList[0].save()
        return await Recipe.find();
    }
    else{
        return await Recipe.find();
    }

}

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
