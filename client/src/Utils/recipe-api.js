import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRecipeList = async (setnewRecipes) => {
  const resp = await fetch(`http://localhost:8000/recipe/list`);
  if (resp.ok) {
    const recipes = await resp.json();
    setnewRecipes(recipes);
  }
};

export const getRecipesAsync = createAsyncThunk(
  "recipe/getRecipesAsync",
  async () => {
    const resp = await fetch("http://localhost:8000/recipe/list");
    if (resp.ok) {
      const recipes = await resp.json();
      return recipes;
    }
  }
);

export const getFavRecipesAsync = createAsyncThunk(
  "recipe/getFavRecipesAsync",
  async () => {
    const resp = await fetch("http://localhost:8000/fav_recipe/list");
    if (resp.ok) {
      const recipes = await resp.json();
      return recipes;
    }
  }
);

export const recipeComment = async (postId, comment, usrId, setComment) => {
  // console.log(`localhost:8000/recipe/${postId}/comment`)
  const res = await fetch(`http://localhost:8000/recipe/${postId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: comment,
      user: usrId,
    }),
  });

  if (!res.ok) {
    return { msg: "error" };
  }
  let data = "";

  return res.json().then((body) => {
    return body;
  });
};

export const recipeCreate = async (recipe) => {
  // console.log(`localhost:8000/recipe/${postId}/comment`)
  const res = await fetch(`http://localhost:8000/recipe/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (!res.ok) {
    return { msg: "error" };
  }
  return res.json().then((body) => {
    return body;
  });
};

export const getRecipeByIdAsync = createAsyncThunk(
  "recipe/getRecipeByIdAsync",
  async (id) => {
    const resp = await fetch(`http://localhost:8000/recipe/${id}`);
    if (resp.ok) {
      const recipe = await resp.json();
      console.log("in get thunk", recipe);
      return recipe;
    }
  }
);

export const recipeCommentAsysn = createAsyncThunk(
  "recipe/recipeCommentAsysn",
  async (payload) => {
    // if(!usrId){
    // 	usrId="Anon"
    // }

    // postId = "638583e78b1c7cbd8953211b"
    // comment = "inside comment"
    // usrId ="acv"

    const resp = await fetch(
      `http://localhost:8000/recipe/${payload.postId}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: payload.comment,
          user: payload.usrId,
        }),
      }
    );
    if (resp.ok) {
      const comment = await resp.json();
      console.log("Comment thunk", comment);
      return comment;
    }
  }
);

export const recipeLikeAsync = createAsyncThunk(
  "recipe/recipeLikeAsync",
  async (payload) => {
    console.log("payload", payload);
    console.log("Like async postId", payload.postId);
    console.log("Like async user id", payload.userId);

    // if(!usrId){
    // 	usrId="Anon"
    // }

    // postId = "638583e78b1c7cbd8953211b"
    // usrId = "638581608b1c7cbd89532112"

    const resp = await fetch(
      `http://localhost:8000/recipe/${payload.postId}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: payload.userId,
        }),
      }
    );
    if (resp.ok) {
      const like = await resp.json();
      console.log("Like thunk", like);
      return like;
    }
  }
);

export const recipeUnLikeAsync = createAsyncThunk(
  "recipe/recipeUnLikeAsync",
  async (payload) => {
    console.log("UnLike async postId", payload.postId);
    console.log("UnLike async user id", payload.userId);

    let usrId = "";
    if (!payload.usrId) {
      usrId = "Anon";
    }

    const resp = await fetch(
      `http://localhost:8000/recipe/${payload.postId}/unlike`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: payload.userId,
        }),
      }
    );
    if (resp.ok) {
      const unlike = await resp.json();
      console.log("unlike thunk", unlike);
      return unlike;
    }
  }
);

export const recipeDeleteAsync= createAsyncThunk(
	'recipe/recipeDeleteAsync',
	async (payload) => {

		console.log('Delete async postId', payload.postId)

		const resp = await fetch(`http://localhost:8000/recipe/delete/${payload.postId}`, {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				postId: payload.postId,
			}),
     	 })
		if (resp.ok) {
			const del = await resp.json();
			console.log('del thunk', del)
			return del;
		}
	}
);


export const addFavRecipeAsync = createAsyncThunk(
  "recipe/addFavRecipeAsync",
  async (payload) => {
    console.log("addFavRecipeAsync postId", payload.postId);
    console.log("addFavRecipeAsync user id", payload.userId);

    let usrId = "";
    if (!payload.usrId) {
      usrId = "Anon";
    }

    const resp = await fetch(`http://localhost:8000/fav_recipe/add_recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: payload.userId,
        recipeId: payload.postId,
      }),
    });
    if (resp.ok) {
      const add_fav = await resp.json();
      console.log("add_fav thunk", add_fav);
      return add_fav;
    }
  }
);

export const removeFavRecipeAsync = createAsyncThunk(
  "recipe/removeFavRecipeAsync",
  async (payload) => {
    console.log("removeFavRecipeAsync postId", payload.postId);
    console.log("removeFavRecipeAsync user id", payload.userId);

    let usrId = "";
    if (!payload.usrId) {
      usrId = "Anon";
    }

    const resp = await fetch(`http://localhost:8000/fav_recipe/remove_recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: payload.userId,
        recipeId: payload.postId,
      }),
    });
    if (resp.ok) {
      const remove_fav = await resp.json();
      console.log("remove_fav thunk", remove_fav);
      return remove_fav;
    }
  }
);
