import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { postItem, editItem } from "../../Utils/inventory-api";
import categories from "./data";
import Select from "react-select";
import moment from "moment";
import { styled } from "@mui/material/styles";

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
const Item2 = styled(TextField)(() => ({
  backgroundColor: "#fff",
  height: "30px",
  border: "0px",
  margin: "10px 5px",
  fontSize: "15px",
  borderRadius: "5px",
  width: "5vw",
  border: "0px",
  alignItems: "center",
  justifyContent: "center",
}));

function AddInventory({ add, item, closeFunc, handleSnack }) {
  let dispatch = useDispatch();

  const [name, setName] = useState(add ? "" : item.name);
  const [pDate, setPdate] = useState(
    add ? "" : moment(item.purchasedDate).format("YYYY-MM-DD")
  );
  const [quan, setQuan] = useState(add ? "" : item.quantity);
  const [nValue, setNvalue] = useState(add ? "" : item.nutrition);
  const [uDate, setUdate] = useState(
    add ? "" : moment(item.usedBy).format("YYYY-MM-DD")
  );
  const [toBuy, setToBuy] = useState(false);
  const [catList, setCatlist] = useState([]);
  const [quanList, setQuanList] = useState([]);
  const [catValue, setCatValue] = useState({
    value: "Select",
    label: "Select",
  });
  const [quanValue, setQuanValue] = useState({
    value: "Select",
    label: "Select",
  });
  const [errName, setErrName] = useState(false);
  const [errU, setErrU] = useState(false);

  const addItem = () => {
    console.log("in add");
    setErrName(false);
    setErrU(false);
    if (name !== "" || uDate !== "") {
      const body = {
        name: name,
        quantity: quan,
        unit: quanValue.value,
        purchased: pDate,
        usedBy: uDate,
        nutrition: nValue,
        category: catValue.value,
        toBuy: toBuy,
      };
      dispatch(postItem(body));
      closeFunc();
      handleSnack({ value: "Item Added Successfully!", status: "success" });
    } else {
      if (name === "") {
        setErrName(true);
      }
      if (uDate === "") {
        setErrU(true);
      }
      handleSnack({
        value: "Please fill all the required fields",
        status: "error",
      });
    }
  };

  const editFunc = () => {
    console.log("in edit");
    const body = {
      ...item,
      name: name,
      quantity: quan,
      unit: quanValue.value,
      purchased: pDate,
      usedBy: uDate,
      nutrition: nValue,
      category: catValue.value,
      toBuy: toBuy,
    };
    console.log(body);
    dispatch(editItem(body));
    clearForm();
    handleSnack("");
    handleSnack({ value: "Item Edited Successfully!", status: "success" });
  };

  const clearForm = () => {
    setName("");
    setNvalue("");
    setPdate("");
    setToBuy("");
    setUdate("");
    setQuanValue({ value: "Select", label: "Select" });
    setCatValue({ value: "Select", label: "Select" });
    setQuan("");
  };

  useEffect(() => {
    let listCat = categories.map((item) => {
      return { value: item.name, label: item.name };
    });
    // console.log(listCat);
    setCatlist(listCat);
    if (!add) {
      let cVal = categories.find((i) => i.name === item.category);
      setCatValue({ value: item.category, label: item.category });
      let ordered = cVal.unit.map((i) => {
        if (i) return { value: i, label: i };
      });
      setQuanList(ordered);
      setQuanValue({ value: item.unit, label: item.unit });
      //   console.log(catValue, quanList, quanValue);
    }
  }, []);
  return (
    <div className="add-form-main">
      <div className="add-form">
        <div className="first-div">
          <div className="input-div">
            <label>Item Name: </label>
            <Item
              type="text"
              required={true}
              id="name"
              name="name"
              value={name}
              InputProps={{
                className: "input-field",
              }}
              onChange={(e) => setName(e.target.value)}
              //   className="input-field"
              error={errName && name === ""}
            />
          </div>
          <div className="input-div">
            <label>Item Purchased Date:</label>
            <Item
              type="date"
              required
              id="pDate"
              name="pDate"
              value={pDate}
              InputProps={{
                className: "input-field",
              }}
              onChange={(e) => setPdate(e.target.value)}
              //   className="input-field"
            />
          </div>
          <div className="input-div">
            <label>Item Category: </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={""}
              name="color"
              options={catList}
              styles={{ width: "32vw" }}
              onChange={(item) => {
                setCatValue(item);
                let list = categories.find((j) => j.name === item.value);
                let ordered = list.unit.map((i) => {
                  return { value: i, label: i };
                });
                // console.log(item, list, ordered);
                setQuanList(ordered);
              }}
              value={catValue}
            />
            {catValue.value !== "Select" && (
              <div className="input-div">
                <label>Item Quantity: </label>
                <div className="quan-div">
                  <Item2
                    type="text"
                    required
                    id="quan"
                    name="quan"
                    value={quan}
                    onChange={(e) => setQuan(e.target.value)}
                    // className="quan-input"
                    InputProps={{
                      className: "quan-input",
                    }}
                  />
                  <Select
                    className="quan-single"
                    classNamePrefix="select"
                    defaultValue={""}
                    name="color"
                    options={quanList}
                    onChange={(item) => {
                      //   console.log(item);
                      setQuanValue(item);
                    }}
                    value={quanValue}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="first-div">
          <div className="input-div">
            <label>Item Nutrition Value: </label>
            <Item
              type="text"
              required
              id="nValue"
              name="nValue"
              value={nValue}
              InputProps={{
                className: "input-field",
              }}
              onChange={(e) => setNvalue(e.target.value)}
              //   className="input-field"
            />
          </div>
          <div className="input-div">
            <label>Item Used By Date:</label>
            <Item
              type="date"
              required
              id="uDate"
              name="uDate"
              value={uDate}
              InputProps={{
                className: "input-field",
              }}
              onChange={(e) => setUdate(e.target.value)}
              //   className="input-field"
              error={errU && uDate === ""}
            />
          </div>
        </div>
      </div>
      <div class="submit-div">
        <button
          id="submit-btn"
          type="submit"
          class="clear-btn"
          onClick={() => (add ? clearForm() : closeFunc())}
        >
          {add ? "Clear" : "Close"}
        </button>
        <button
          id="submit-btn"
          type="submit"
          class="create-btn"
          onClick={() => (add ? addItem() : editFunc())}
        >
          {add ? "Create Item" : "Edit Item"}
        </button>
      </div>
    </div>
  );
}

export default AddInventory;
