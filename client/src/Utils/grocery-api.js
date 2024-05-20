import { createAsyncThunk } from "@reduxjs/toolkit";

export const getGroceyAsync = createAsyncThunk(
  "recipe/getGroceyAsync",
  async () => {
    const resp = await fetch("http://localhost:8000/grocery/list");
    if (resp.ok) {
      const recipes = await resp.json();
      return recipes;
    }
  }
);

export const addGroceryAsync = createAsyncThunk(
  "grocery/addGroceryAsync",
  async (payload) => {
    const resp = await fetch("http://localhost:8000/grocery/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: payload.comment,
        userId: payload.userId,
      }),
    });

    if (resp.ok) {
      const grocery = await resp.json();
      return grocery;
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload) => {
    console.log("delete async", payload);
    const resp = await fetch(
      `http://localhost:8000/grocery/delete/${payload.id}`,
      {
        method: "DELETE",
      }
    );

    if (resp.ok) {
      return await resp.json();
    }
  }
);
