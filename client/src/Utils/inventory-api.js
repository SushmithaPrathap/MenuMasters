import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItemList = createAsyncThunk("users/fetchList", async () => {
  let dataUrl = "http://localhost:8000/inventory/list";
  const response = await axios.get(dataUrl);
  console.log("in api call", response);
  return response.data;
});

export const fetchItemById = createAsyncThunk(
  "users/fetchItemById",
  async (itemId) => {
    let dataUrl = `http://localhost:8000/inventory/${itemId}`;
    const response = await axios.get(dataUrl);
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchItemByName = createAsyncThunk(
  "users/fetchItemByName",
  async (data, thunkAPI) => {
    console.log("in search api", data);
    // const config = {
    //   method: "get",
    //   url: "http://localhost:8000/inventory/search",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: JSON.stringify(data),
    // };
    const url = "http://localhost:8000/inventory/search";
    const response = await axios.get(url, {
      params: data,
    });
    console.log("in api call", response);
    return response.data;
  }
);

export const postItem = createAsyncThunk(
  "users/postItem",
  async (data, thunkAPI) => {
    console.log("in post api", data);
    const config = {
      method: "post",
      url: "http://localhost:8000/inventory/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    const response = await axios(config);
    console.log("in api call", response);
    return response.data;
  }
);

export const editItem = createAsyncThunk(
  "users/editItem",
  async (data, thunkAPI) => {
    console.log("in edit api", data);
    const config = {
      method: "put",
      url: `http://localhost:8000/inventory/update/${data.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    const response = await axios(config);
    console.log("in api call", response);
    return response.data;
  }
);

export const deleteItem = createAsyncThunk(
  "users/deleteItem",
  async (id, thunkAPI) => {
    console.log("in del api", id);
    const config = {
      method: "delete",
      url: `http://localhost:8000/inventory/delete/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios(config);
    console.log("in api call", response);
    return response.data;
  }
);
