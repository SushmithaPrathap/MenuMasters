import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipesAsync } from "../../Utils";
import AllList from "../Homepage/List-comp";
import "./explore.scss";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { cuisines, type, durationTimes } from "../Common/arrays";
import ListComp from "../Homepage/ListComp";
import _ from "lodash";

const ChipItem = styled(Chip)(() => ({
  margin: "5px 5px",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "20px 10px",
}));

const Explore = () => {
  const dispatch = useDispatch();
  const [cSelected, SetCSelected] = useState([]);
  const [tSelected, SetTSelected] = useState([]);
  const [dSelected, SetDSelected] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [filtered, setFiltered] = useState({});

  let recipeState = useSelector((state) => {
    return state["recipes"];
  });

  let { list } = recipeState;
  console.log(list);

  useEffect(() => {
    dispatch(getRecipesAsync()); //dispatch the action to call the api
  }, [dispatch]);

  const cHandleClick = (value) => {
    let array = [...cSelected];
    if (array.includes(value)) {
      array.pop(value);
    } else {
      array.push(value);
    }
    SetCSelected(array);
    console.log(value, cSelected, array);
  };
  const tHandleClick = (value) => {
    let array = [...tSelected];
    if (array.includes(value)) {
      array.pop(value);
    } else {
      array.push(value);
    }
    SetTSelected(array);
    console.log(value, cSelected, array);
  };
  const dHandleClick = (value) => {
    let array = [...dSelected];
    if (array.includes(value)) {
      array.pop(value);
    } else {
      array.push(value);
    }
    SetDSelected(array);
    console.log(value, cSelected, array);
  };

  const showRecipes = () => {
    let array = [];
    list.forEach((element) => {
      cSelected.forEach((item) => {
        if (element.cuisine === item) {
          console.log("ele", element, "item", item);
          array.push(element);
        }
      });
      tSelected.forEach((item) => {
        if (element.type === item) {
          console.log("ele", element, "item", item);
          array.push(element);
        }
      });
      dSelected.forEach((item) => {
        if (element.duration <= item) {
          console.log("ele", element, "item", item);
          array.push(element);
        }
      });
    });
    let temp = _.groupBy(array, "name");
    console.log("arr", array, temp);
    setFiltered(temp);
    setShowAll(false);
  };

  const clearForm = () => {
    SetCSelected([]);
    SetTSelected([]);
    SetDSelected([]);
    setShowAll(true);
  };
  return (
    <div className="explore-div">
      <div className="filter-div">
        <div className="filter">
          <div>
            <p>Filter By Cuisine</p>
            <div className="stack-div">
              {cuisines.map((item) => {
                return (
                  <ChipItem
                    label={item}
                    variant={cSelected.includes(item) ? "filled" : "outlined"}
                    clickable
                    size="small"
                    color="primary"
                    onClick={() => cHandleClick(item)}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <p>Filter By Type</p>
            <div className="stack-div">
              {type.map((item) => {
                return (
                  <ChipItem
                    label={item}
                    variant={tSelected.includes(item) ? "filled" : "outlined"}
                    clickable
                    size="small"
                    color="primary"
                    onClick={() => tHandleClick(item)}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <p>Filter By Duration</p>
            <div className="stack-div">
              {durationTimes.map((item) => {
                return (
                  <ChipItem
                    label={`In ${item} mins`}
                    variant={dSelected.includes(item) ? "filled" : "outlined"}
                    clickable
                    size="small"
                    color="primary"
                    onClick={() => dHandleClick(item)}
                  />
                );
              })}
            </div>
          </div>
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
      <div className="rList-div">
        {showAll ? (
          <AllList list={list} />
        ) : (
          <>
            {Object.keys(filtered).length !== 0 && (
              <ListComp list={list} orderList={filtered} explore={true} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
