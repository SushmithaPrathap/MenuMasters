import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserAsync = createAsyncThunk("user/getUserAsync", async () => {
  const resp = await fetch("http://localhost:8000/api/current_user");
  if (resp.ok) {
    const user = await resp.json();
    return { user };
  }
});

export const getRecipesAsync = createAsyncThunk(
  "recipe/getRecipesAsync",
  async () => {
    const resp = await fetch("http://localhost:8000/recipe/list");
    if (resp.ok) {
      const recipes = await resp.json();
      console.log("in api", recipes);
      return { recipes };
    }
  }
);

export const getRecipeById = async (
  id,
  setRecipe,
  setLikeCount,
  setUserLiked,
  setComment
) => {
  const resp = await fetch(`http://localhost:8000/recipe/${id}`);
  if (resp.ok) {
    const recipes = await resp.json();
    console.log("getRecipeById", recipes);

    let likes = recipes.likes;

    setRecipe(recipes);
    setComment(recipes.comments);
    setUserLiked(recipes.likes);
    setLikeCount(likes.length);
  }
};

export const userLogin = async () => {
  const resp = await fetch("http://localhost:8000/auth/google");
};

export const createBlogsAsync = async (formValues) => {
  let data = `{
	"name":"${formValues.name}",
	"description":"${formValues.description}",
	"content":"${formValues.content}",
	"author":"${formValues.author}"
}`;
  data = JSON.parse(data);
  console.log("data to be saved", data);
  const resp = await fetch("http://localhost:8000/blog/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (resp.ok) {
    const post = await resp.json();
    //getAllTodo(setTodo(todo))
    return { post };
  }
};

export const getBlogPosts = createAsyncThunk(
  "blog/getBlogpostsAsync",
  async () => {
    const resp = await fetch("http://localhost:8000/blog/list");
    if (resp.ok) {
      const blogPosts = await resp.json();
      return { blogPosts };
    }
  }
);
