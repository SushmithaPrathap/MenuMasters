import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { recipeComment } from "../../Utils/recipe-api";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeByIdAsync, recipeCommentAsysn } from "../../Utils/recipe-api";

const CreateComment = () => {
  const dispatch = useDispatch();
  let recipeDetailState = useSelector((state) => state.recipeDetail);
  console.log("recipe details state in comment", recipeDetailState);

  const defaultValues = {
    name: "",
  };

  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form", formValues.name);

    let commentData = {
      postId: recipeDetailState.content._id,
      comment: formValues.name,
      userId: "user",
    };

    dispatch(recipeCommentAsysn(commentData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          <TextField
            id="name-input"
            name="name"
            label="Add Comment"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
            style={{ margin: "10px", width: "40vw", backgroundColor: "white" }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ margin: "10px" }}
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
