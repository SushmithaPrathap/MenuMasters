import React ,{useEffect, useState}from 'react'
import { useParams } from "react-router-dom";
import { getRecipeById, getRecipeByIdAsync } from '../Utils';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


const RecipeItem = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState("recipe")
  const [likeCount, setLikeCount] = useState(0)
  const [userLiked, setUserLiked] = useState(true)  
  const [comment, setComment] = useState([])

  let likes = ["123", "234"]
  let comments = [{
    "content": "new commnent",
    "date": "2022-11-29T20:50:37.146Z",
    "user": "Form",
    "_id": "6386803ab9d02f796ac5ea22",
    "__v": 0
}, {
  "content": "new commnent",
  "date": "2022-11-29T20:50:37.146Z",
  "user": "Form",
  "_id": "6386803ab9d02f796ac5ea22",
  "__v": 0
}]

  useEffect(() => {
    // setRecipe(getRecipeById(id))
    getRecipeById(id, setRecipe, setLikeCount, setUserLiked, setComment)

	}, []);


  

  

  // console.log('state recipe likes',recipe.likes)
  // console.log('comments')
  

  return (
    <div>
      {id}
      <p>{recipe.name}</p>
      <p>{recipe.description}</p>
      <p>likes{likeCount}</p>
      {
        userLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />
      }
      <h1>comments</h1>
      {
      comments.map((comment)=>(
        <p>
            {comment.content}
        </p>
      ))
}
      {/* {recipe.comments} */}
    </div>
  )
}

export default RecipeItem