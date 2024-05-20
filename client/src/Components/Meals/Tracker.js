import React, { useState, useEffect } from "react";
import SnackBarComp from "../Common/SnackBar";
import AddForm from "./AddForm";
import DayGraph from "./DayGraph";
import HistoryComp from "./HistoryComp";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllMeals, getMealByDate } from "../../Utils/meal-api";
import _ from "lodash";
import moment from "moment";

const Tracker = () => {
  let dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [op, setOp] = useState("");
  const [value, setValue] = useState("");

  let allList = useSelector((store) => {
    let state = store["meal"];
    // let list = state.list.map((item) => {
    //   console.log("i updateDate", item.updateDate, item);
    //   return {
    //     calorie: item.calorie,
    //     updateDate: moment(item.updateDate).format("MM/DD/YYYY"),
    //     id: item.id,
    //   };
    // });
    // console.log(list, "list before group");
    let temp = _.groupBy(state.list, "updateDate");
    // console.log(temp, "list after group");
    return temp;
  });
  console.log(allList);

  const calTotal = () => {
    let madeArray = Object.keys(allList).map((item) => {
      let array = allList[item];
      let total = 0;
      // console.log("cal arr", array);
      if (array !== undefined) {
        array.map((item1) => {
          let cal = parseInt(item1.calorie);
          total = total + cal;
        });
      }
      // console.log(total);
      return {
        date: item,
        total: total,
      };
    });
    return madeArray;
  };

  useEffect(() => {
    dispatch(getAllMeals());
    let datePassed = {
      date: moment().format("YYYY-MM-DD"),
    };
    console.log(datePassed);
    dispatch(getMealByDate(datePassed));
    setValue("Today's");
  }, []);

  const handleDayCall = (date) => {
    let datePassed = {
      date,
    };
    console.log(datePassed);
    dispatch(getMealByDate(datePassed));
    setValue(moment(date).format("LL"));
  };

  return (
    <div className="main-div-tracker">
      <div className="second-div">
        <AddForm
          handleSnack={(op) => {
            console.log("open", op);
            setOpen(true);
            setOp(op);
          }}
          handleCall={(date) => handleDayCall(date)}
        />
        <HistoryComp
          list={calTotal()}
          handleCall={(date) => handleDayCall(date)}
        />
      </div>
      <DayGraph value={value} />
      <SnackBarComp open={open} close={() => setOpen(false)} operation={op} />
    </div>
  );
};

export default Tracker;
