import React from "react";
import RecipeComp from "./RecipeComp";

function AllList({ list }) {
  return (
    <div>
      {list.map((item) => (
        <RecipeComp item={item} />
      ))}
    </div>
  );
}

export default AllList;
