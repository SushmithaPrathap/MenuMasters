import React from "react";
import RecipeComp from "./RecipeComp";

function ListComp({ list, orderList, explore }) {
  console.log(orderList);
  let tempList = [];
  Object.keys(orderList).map((item) => {
    let element = orderList[item];
    let value = {}
    if (!explore) {
      value = {
        ...element[0],
        // recipe: element[0],
        total: element.length,
      };
    } else {
      value = {
        ...element[0],
      };
    }
    console.log(value);
    tempList.push(value);
  });
  console.log(tempList);
  return (
    <div>
      {tempList.map((item) => (
        <RecipeComp item={item} />
      ))}
    </div>
  );
}

export default ListComp;
