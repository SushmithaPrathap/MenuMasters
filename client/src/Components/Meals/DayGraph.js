import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import _ from "lodash";
import DonutChart from "react-donut-chart";
import MealCard from "./MealCard";

const DayGraph = ({ value }) => {
  // let dispatch = useDispatch();
  // useEffect(() => {
  //   let datePassed = {
  //     date: moment().format("YYYY-MM-DD"),
  //   };
  //   console.log(datePassed);
  //   dispatch(getMealByDate(datePassed));
  // }, []);

  let dishList = useSelector((store) => {
    let state = store["meal"];
    let temp = _.groupBy(state.dayMeal, "foodTime");
    // console.log(temp, state.dayMeal);
    return temp;
  });
  console.log(dishList);

  let list = useSelector((store) => {
    return store["meal"];
  });

  let { dayMeal } = list;

  const calTotalPerTime = (value) => {
    let array = dishList[value];
    if (Object.keys(dishList).length !== 0) {
      let total = 0;
      if (array !== undefined) {
        array.map((item) => {
          let cal = parseInt(item.calorie);
          total = total + cal;
        });
      }
      // console.log(total);
      return total;
    }
  };
  const calTotal = () => {
    if (Object.keys(dayMeal).length !== 0) {
      let total = 0;
      dayMeal.map((item) => {
        let cal = parseInt(item.calorie);
        total = total + cal;
      });
      // console.log("total", total);
      return total;
    }
  };

  let totalArray = [
    {
      label: "Breakfast",
      value: calTotalPerTime("Breakfast"),
    },
    {
      label: "Lunch",
      value: calTotalPerTime("Lunch"),
    },
    {
      label: "Dinner",
      value: calTotalPerTime("Dinner"),
    },
  ];
  return (
    <div className="first-div">
      <div className="inside-div">
        {dayMeal.length !== 0 ? (
          <>
            <p className="heading">
              {value === "Today's" ? value : `${value} - `} Meal
            </p>
            <div className="chart-div">
              <DonutChart data={totalArray} width={"650"} height={"450"} />
            </div>
            <div className="total-div">
              <h2>Total Calories Intake:</h2> <p>{calTotal()}</p>
            </div>
            <div className="table-div">
              {Object.keys(dishList).length !== 0 && (
                <div>
                  {dishList["Breakfast"] && (
                    <MealCard
                      value={"Breakfast"}
                      item={dishList["Breakfast"]}
                      total={calTotalPerTime("Breakfast")}
                    />
                  )}
                  {dishList["Lunch"] && (
                    <MealCard
                      value={"Lunch"}
                      item={dishList["Lunch"]}
                      total={calTotalPerTime("Lunch")}
                    />
                  )}
                  {dishList["Dinner"] && (
                    <MealCard
                      value={"Dinner"}
                      item={dishList["Dinner"]}
                      total={calTotalPerTime("Dinner")}
                    />
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="total-div">
            <h2>Please Log your meals to display the analysis</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayGraph;
