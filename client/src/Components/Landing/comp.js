import React from "react";
import "./Landing.scss";
import image from "../../images/food.jpeg";

const Comp = () => {
  return (
    <div className="comp-main">
      <div className="text-div">
        <h2>Our Goal</h2>
        <p>
          We are developing a web application that simplifies the process for
          college students and young professionals to come up with meal ideas.
          Help them find recipes with the ingredients they have available.
          Additionally present the recipes keeping health as the major point of
          view. This will essentially reduce the amount of time that is spent on
          thinking about what can made out of the ingredients in hand. This will
          help students and professionals focus on being more productive.
        </p>
        <p>
          Enables users to track the calories being consumed and also make them
          more inclined towards eating healthy on a daily basis.
        </p>
        <p>
          Users can also explore recipes from different parts of the world or
          within their locality and try out new recipes.
        </p>
      </div>
      <div className="image-div">
        <img src={image} />
      </div>
    </div>
  );
};

export default Comp;
