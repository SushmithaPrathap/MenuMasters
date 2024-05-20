import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  recipeLikeAsync,
  recipeUnLikeAsync,
  addFavRecipeAsync,
  removeFavRecipeAsync,
  getFavRecipesAsync,
} from "../../Utils/recipe-api";

function Sidebar(props) {
  const { archives, description, social, title, recipe } = props;

  //Redux for recipe details
  const dispatch = useDispatch();
  let recipeDetailState = useSelector((state) => state.recipeDetail);
  console.log("recipe details state in sidebar", recipeDetailState);

  let recipeDetail = recipeDetailState.content;
  let likes = recipeDetail.likes;

  let likeCount = likes.length;

  //Redux for user details
  let user = useSelector((state) => state.user);
  console.log("user id in side", user.user._id);
  console.log("likes", likes);

  let userId = user.user._id;

  //Redux for fav recipes

  if (likes.includes(user.user._id)) {
    console.log("user liked it");
  } else {
    console.log("User nope");
  }

  const likeData = {
    postId: recipeDetail._id,
    userId: user.user._id,
  };

  const unlikeData = {
    postId: recipeDetail._id,
    userId: user.user._id,
  };
  const handleLike = () => {
    dispatch(recipeLikeAsync(likeData));
  };

  const handleunlike = () => {
    dispatch(recipeUnLikeAsync(unlikeData));
  };

  const handleAddToFav = () => {
    dispatch(addFavRecipeAsync(likeData));
  };

  const handleRemoveFav = () => {
    dispatch(removeFavRecipeAsync(likeData));
  };

  //Redux for fav recipes
  let favRecipeState = useSelector((state) => {
    return state["favRecipes"];
  });
  console.log("fav recipes", favRecipeState);

  let allRecipeList = favRecipeState.list;

  let userFavRecipe = [];

  for (let i of allRecipeList) {
    if (userId == i.userId) {
      userFavRecipe = i.recipes;
    }
  }

  console.log("userFavRecipe", userFavRecipe);

  return (
    <div style={{ flex: "0.3" }}>
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: "20px",
          border: "1px solid #1876d1",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Cuisine - {recipe.cuisine}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Nutrition - {recipe.nutrition}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Type - {recipe.type}
        </Typography>
        <Typography variant="h6" gutterBottom>
          duration - {recipe.duration} mins
        </Typography>
        <Typography variant="h6" gutterBottom>
          Likes - {likeCount}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {likes.includes(user.user._id) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
          <div>
            {likes.includes(user.user._id) ? (
              <Button variant="text" onClick={handleunlike}>
                Unlike
              </Button>
            ) : (
              <Button variant="text" onClick={handleLike}>
                Like
              </Button>
            )}
          </div>

          <div>
            {userFavRecipe.includes(recipeDetail._id) ? (
              <Button variant="outlined" onClick={handleRemoveFav}>
                Favorite Recipe !
              </Button>
            ) : (
              <Button variant="outlined" onClick={handleAddToFav}>
                Add to favorites
              </Button>
            )}
          </div>
        </div>
      </div>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        {/* Archives */}
      </Typography>
      {archives.map((archive) => (
        <Link
          display="block"
          variant="body1"
          href={archive.url}
          key={archive.title}
        >
          {archive.title}
        </Link>
      ))}

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        {/* Social */}
      </Typography>
      {social.map((network) => (
        <Link
          display="block"
          variant="body1"
          href="#"
          key={network.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
