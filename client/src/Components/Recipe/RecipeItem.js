import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../../Utils";
import { useSelector, useDispatch } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Main from "./Main";
import Sidebar from "./Sidebar";

import { getRecipeByIdAsync } from "../../Utils/recipe-api";

const RecipeItem = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  let recipeDetailState = useSelector((state) => state.recipeDetail);
  console.log("recipe details state", recipeDetailState);
  let recipeDetail = recipeDetailState.content;

  useEffect(() => {
    dispatch(getRecipeByIdAsync(id));
  }, [dispatch]);

  const sidebar = {
    title: "About",
    description:
      "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
    archives: [],
    social: [],
  };

  const theme = createTheme();

  return (
    <div
      style={{
        margin: "70px 0px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-around",
          backgroundColor: "whitesmoke",
          padding:"20px",
        }}
      >
        <Main />
        <Sidebar
          title={sidebar.title}
          description={sidebar.description}
          archives={sidebar.archives}
          social={sidebar.social}
          recipe={recipeDetail}
        />
      </div>
    </div>
  );
};

export default RecipeItem;
