import React from "react";
import cooking from "../../images/cooking.png";
import calorie from "../../images/calorie.png";
import cusine from "../../images/cusine.png";
import ingredients from "../../images/ingredients.png";

const Features = () => {
  let data = [
    {
      name: "Optimzing the cooking proces ",
      icon: cooking,
    },
    {
      name: "Calorie tracking",
      icon: calorie,
    },
    {
      name: "Keep an inventory of ingredients at home",
      icon: ingredients,
    },
    {
      name: "Explore new recipes",
      icon: cusine,
    },
  ];
  return (
    <div className="features-main">
      {data.map((item) => (
        <div className="feature-div">
          <img src={item.icon} />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
