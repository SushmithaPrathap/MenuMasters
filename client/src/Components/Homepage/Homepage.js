import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipesAsync } from "../../Utils";
import { fetchItemList } from "../../Utils/inventory-api";
import "./Home.scss";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import RecipeComp from "./RecipeComp";
import _ from "lodash";
import ListComp from "./ListComp";
import AllList from "./List-comp";

const ChipItem = styled(Chip)(() => ({
  margin: "5px 5px",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "20px 10px",
}));

const Homepage = () => {
  const dispatch = useDispatch();

  const [pantry, setPantry] = useState([]);
  const [filtered, setFiltered] = useState({});
  const [showAll, setShowAll] = useState(false);

  let user = useSelector((state) => state.user);
  console.log("user homepage user", user.user.name);
  //   useEffect(() => {
  //     dispatch(getRecipesAsync());
  //   }, [dispatch]);

  //Recipes state setup
  let recipeState = useSelector((state) => {
    return state["recipes"];
  });

  let { list } = recipeState;

  let itemState = useSelector((store) => {
    return store["inventory"];
  });

  let { loading, itemList, error } = itemState;
  //   console.log("recipes", list, "i", itemList);

  useEffect(() => {
    dispatch(fetchItemList()); //dispatch the action to call the api
    dispatch(getRecipesAsync());
  }, [dispatch]);

  const handleClick = (value) => {
    let array = [...pantry];
    if (array.includes(value)) {
      array.pop(value);
    } else {
      array.push(value);
    }
    setPantry(array);
    // console.log(value, pantry, array);
  };

  const clearForm = () => {
    setPantry([]);
    setShowAll(true);
  };
  const showRecipes = () => {
    let array = [];
    list.forEach((element) => {
      pantry.forEach((item) => {
        if (element.items.includes(item)) {
          //   console.log("ele", element, "item", item);
          array.push(element);
        }
      });
    });
    let temp = _.groupBy(array, "name");
    // console.log("arr", array, temp);
    setFiltered(temp);
    setShowAll(false);
  };
  //   console.log("stste", pantry, filtered);
  return (
    <div className="home-main">
      {/* <h1>Welcome {user.user.name}</h1> */}
      <div className="main-div-homepage">
        <div className="f-div">
          <h2>Your Pantry</h2>
          <div className="stack-div">
            {itemList.map((item) => {
              return (
                <ChipItem
                  label={item.name}
                  variant={pantry.includes(item.name) ? "filled" : "outlined"}
                  clickable
                  size="small"
                  color="primary"
                  onClick={() => handleClick(item.name)}
                />
              );
            })}
          </div>
          <div>
            <div class="submit-div">
              <button
                id="submit-btn"
                type="submit"
                class="clear-btn"
                onClick={() => clearForm()}
              >
                Clear
              </button>
              <button
                id="submit-btn"
                type="submit"
                class="create-btn"
                onClick={() => showRecipes()}
              >
                Show Recipes
              </button>
            </div>
          </div>
        </div>
        <div className="s-div">
          {showAll ? (
            <AllList list={list} />
          ) : (
            <>
              {Object.keys(filtered).length !== 0 ? (
                <ListComp list={list} orderList={filtered} />
              ) : (
                <div className="empty-div">
                  <h2>
                    Select the ingredients on the left for suggestions !
                  </h2>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
