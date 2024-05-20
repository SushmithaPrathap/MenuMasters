import * as React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import path from "../../images/dish.jpeg";
import CreateComment from "./CreateComment";

import { useSelector, useDispatch } from "react-redux";
import "../../Style/blogsinglepost.scss";

const Main = () => {
  const dispatch = useDispatch();
  let recipeDetailState = useSelector((state) => state.recipeDetail);
  console.log("recipe details state in main", recipeDetailState);

  let recipeDetail = recipeDetailState.content;
  let comment = recipeDetail.comments;
  let image = recipeDetail.image;

  console.log(image);
  const PF = "http://localhost:8000/images/";

  // let ing_raw = recipeDetail.items;
  // console.log('ing_raw',ing_raw)
  // let ing_list = ing_raw.join(',')

  return (
    <div
      style={{
        flex: "0.65",
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
      <img
        src={PF + recipeDetail.image}
        alt=""
        className="singlePostImg"
      ></img>
      <Typography
        variant="h2"
        gutterBottom
        style={{
          fontSize: "30px",
          color: "#404040",
          fontWeight: "bold",
          margin: "10px",
        }}
      >
        {recipeDetail.name}
      </Typography>
      <Divider />
      <Typography
        style={{
          fontSize: "20px",
          color: "#404040",
          fontWeight: "600",
          margin: "10px",
        }}
        variant="h4"
        gutterBottom
      >
        Ingredients
      </Typography>
      <Typography
        style={{
          fontSize: "18px",
          color: "#404040",
          fontWeight: "500",
          margin: "10px",
          lineHeight: "1.5rem",
          textAlign: "justify",
        }}
        variant="h6"
        gutterBottom
      >
        {recipeDetail.items.join(',')}
      </Typography>
      <Divider />
      <Typography
        style={{
          fontSize: "20px",
          color: "#404040",
          fontWeight: "600",
          margin: "10px",
        }}
        variant="h4"
        gutterBottom
      >
        Description
      </Typography>
      <Typography
        style={{
          fontSize: "18px",
          color: "#404040",
          fontWeight: "500",
          margin: "10px",
          lineHeight: "1.5rem",
          textAlign: "justify",
        }}
        variant="h6"
        gutterBottom
      >
        {recipeDetail.description}
      </Typography>
      {/* <Divider /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundColor: "whitesmoke",
          border: "1px solid #8c8c8c",
          borderRadius: "10px",
          padding: "10px",
          width: "98%",
          margin: "20px 0px",
        }}
      >
        <Typography
          style={{
            fontSize: "20px",
            color: "#404040",
            fontWeight: "600",
            margin: "10px",
          }}
          variant="h4"
          gutterBottom
        >
          Comments
        </Typography>
        <CreateComment />
        {comment.map((com) => (
          <p>{com.content}</p>
        ))}
      </div>
    </div>
  );
};

export default Main;
