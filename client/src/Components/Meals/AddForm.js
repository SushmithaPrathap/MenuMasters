import React, { useState, useEffect } from "react";
import "./styles.scss";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { postMeal, getAvail, getMealByDate } from "../../Utils/meal-api";
import AsyncSelect from "react-select/async";
import moment from "moment";

const Item = styled(TextField)(() => ({
  backgroundColor: "#fff",
  height: "30px",
  border: "0px",
  margin: "10px 5px",
  fontSize: "15px",
  borderRadius: "5px",
  width: "30vw",
  border: "0px",
  alignItems: "center",
  justifyContent: "center",
}));
const ChipItem = styled(Chip)(() => ({
  margin: "5px 10px",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "20px",
}));

const AddForm = ({ handleSnack, handleCall }) => {
  let dispatch = useDispatch();
  const [name, setName] = useState({
    value: "Select",
    label: "Select",
  });
  const [quan, setQuan] = useState("");
  const [cal, setCal] = useState("");
  const [time, setTime] = useState("");
  const [date, setdate] = useState(moment().format("YYYY-MM-DD"));
  const [item, setItem] = useState({});
  const [errName, setErrName] = useState(false);
  const [errT, setErrT] = useState(false);

  useEffect(() => {
    dispatch(getAvail());
  }, []);

  let dishList = useSelector((store) => {
    let state = store["meal"];
    let temp = state.availList.map((item) => {
      return { value: item.Food, label: item.Food };
    });
    return temp;
  });

  let stateList = useSelector((store) => {
    return store["meal"];
  });

  let { availList } = stateList;

  const handleClick = (value) => {
    // console.info("You clicked the Chip.");
    setTime(value);
  };

  const clearForm = () => {
    setName({
      value: "Select",
      label: "Select",
    });
    setQuan("");
    setCal("");
    setTime("");
    setdate(moment().format("YYYY-MM-DD"));
  };

  const addMeal = () => {
    console.log("in add");
    setErrName(false);
    setErrT(false);
    if (name.value !== "Select" || time !== "") {
      const body = {
        dish: name.value,
        quantity: quan,
        calorie: cal,
        foodTime: time,
        updateDate: new Date(date),
      };
      console.log("bodt", body);
      dispatch(postMeal(body));
      handleSnack({ value: "Item Added Successfully!", status: "success" });
      clearForm();
      handleCall(moment(date).format("YYYY-MM-DD"));
    } else {
      if (name.value === "Select") {
        setErrName(true);
      }
      if (time === "") {
        setErrT(true);
      }
      handleSnack({
        value: "Please fill all the required fields",
        status: "error",
      });
    }
  };

  const filterNames = (inputValue) => {
    // console.log("IV", inputValue);
    return dishList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue) => {
    // console.log("in load");
    return new Promise((resolve, reject) => {
      // using setTimeout to emulate a call to server
      setTimeout(() => {
        resolve(filterNames(inputValue));
      }, 2000);
    });
  };

  return (
    <div className="form-div">
      <p className="heading">Add your Meal</p>
      <div className="form">
        <div className="input-div">
          <label>Choose: </label>
          <Stack direction="row" spacing={1} style={{ padding: "10px" }}>
            <ChipItem
              label="Breakfast"
              variant={time === "Breakfast" ? "filled" : "outlined"}
              clickable
              size="medium"
              color="primary"
              onClick={() => handleClick("Breakfast")}
            />
            <ChipItem
              label="Lunch"
              variant={time === "Lunch" ? "filled" : "outlined"}
              clickable
              size="medium"
              color="primary"
              onClick={() => handleClick("Lunch")}
            />
            <ChipItem
              label="Dinner"
              variant={time === "Dinner" ? "filled" : "outlined"}
              clickable
              size="medium"
              color="primary"
              onClick={() => handleClick("Dinner")}
            />
          </Stack>
        </div>
        <div className="input-div">
          <label>Name: </label>
          {dishList.length !== 0 && (
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions
              className="basic-single"
              styles={{ width: "32vw" }}
              onChange={(item) => {
                setName(item);
                let temp = availList.find((i) => i.Food === item.value);
                // console.log("temp", temp);
                setItem(temp);
                setQuan(temp.Servings);
                setCal(temp.Calories);
              }}
              value={name}
            />
          )}
        </div>
        <div className="input-div">
          <label>Quantity:</label>
          <Item
            type="text"
            required
            id="quan"
            name="quan"
            value={quan}
            InputProps={{
              className: "input-field",
            }}
            onChange={(e) => {
              setQuan(e.target.value);
              let value = parseInt(e.target.value);
              let value1 = value * item.Calories;
              // console.log(value1);
              setCal(value1);
            }}
            //   className="input-field"
          />
        </div>
        <div className="input-div">
          <label>Calorie:</label>
          <Item
            type="text"
            required
            id="cal"
            name="cal"
            value={cal}
            InputProps={{
              className: "input-field",
            }}
            onChange={(e) => setCal(e.target.value)}
            //   className="input-field"
          />
        </div>
        <div className="input-div">
          <label>Date:</label>
          <Item
            type="date"
            required
            id="date"
            name="date"
            value={date}
            InputProps={{
              className: "input-field",
            }}
            onChange={(e) => setdate(e.target.value)}
            //   className="input-field"
          />
        </div>
        <div class="action-div">
          <button
            id="clear"
            type="clear"
            class="clear"
            onClick={() => clearForm()}
          >
            Clear
          </button>
          <button
            id="submit"
            type="submit"
            class="create"
            onClick={() => addMeal()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
