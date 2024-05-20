import * as React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import CreateComment from "./CreateComment";

import { useSelector, useDispatch } from "react-redux";
import "../../Style/blogsinglepost.scss";
import "./recipe.scss";

function Main(props) {
  const dispatch = useDispatch();
  let recipeDetailState = useSelector((state) => state.recipeDetail);
  console.log("recipe details state in main", recipeDetailState);

  let recipeDetail = recipeDetailState.content;
  let comment = recipeDetail.comments;
  let image = recipeDetail.image;
  const PF = "http://localhost:8000/images/";

  return (
    <div className="recipe-main">
      <img src={PF + image} alt="" className="singlePostImg"></img>
      <Typography
        variant="h2"
        gutterBottom
        style={{ fontSize: "30px", color: "#404040", fontWeight: "bold" }}
      >
        {recipeDetail.name}
      </Typography>
      <Divider />
      <Typography variant="h4" gutterBottom>
        Ingredients
      </Typography>
      <Typography variant="h6" gutterBottom>
        {/* {recipeDetail.items} */}
      </Typography>
      <Divider />
      <Typography variant="h4" gutterBottom>
        Description
      </Typography>
      <Typography variant="h6" gutterBottom>
        {recipeDetail.description}
      </Typography>
      <Divider />

      <p>Comments</p>
      <CreateComment />
      {comment.map((com) => (
        <p>{com.content}</p>
      ))}
    </div>
  );
}

export default Main;
