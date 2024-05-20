import React from "react";
import path from "../../images/foodImage.jpeg";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

const RecipeComp = ({ item }) => {
  // console.log(item);
  const navigate = useNavigate();
  return (
    <div className="card-div" onClick={() => navigate(`/recipe/${item._id}`)}>
      <img
        src={item.image ? `http://localhost:8000/images/${item.image}` : path}
        className="card-image"
        style={{ width: "250px", height: "200px", borderRadius: "10px" }}
      />

      <div className="recipe-content">
        <h2>{item.name}</h2>
        <p>{item.cuisine}</p>
        {item.total && <p>You have all {item.total} ingredients</p>}
      </div>
    </div>
  );
};

export default RecipeComp;
