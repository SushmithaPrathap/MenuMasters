import { CircularProgress, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemByName, fetchItemList } from "../../Utils/inventory-api";
import SnackBarComp from "../Common/SnackBar";
import AddInventory from "./AddInventory";
import List from "./List";
import "./main.scss";

function InventoryMain() {
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [op, setOp] = useState("");
  const [itemName, setItemName] = useState("");

  let dispatch = useDispatch();

  //fetch data from the redux store
  let itemState = useSelector((store) => {
    return store["inventory"];
  });

  let userState = useSelector((store) => {
    return store["user"];
  });

  useEffect(() => {
    dispatch(fetchItemList()); //dispatch the action to call the api
  }, [dispatch]);

  const searchFunc = () => {
    let query = {
      name: itemName,
    };
    dispatch(fetchItemByName(query));
    setFlag(true);
  };

  const resetFunc = () => {
    setItemName("");
    setFlag(false);
    dispatch(fetchItemList());
  };

  let { loading, itemList, error } = itemState;
  let { user } = userState;
  console.log(itemList, user);
  return (
    <div className="main-grid">
      <h1>{user !== "" ? `${user.name}'s` : "Your"} Pantry</h1>
      <div className="search-div">
        <TextField
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          style={{ width: flag ? "70%" : "80%" }}
          placeholder="Search by name..."
        />
        <button
          onClick={() => searchFunc()}
          className="AddBtn"
          disabled={itemName === "" || itemName === " "}
        >
          Search Item
        </button>
        {flag && (
          <button onClick={() => resetFunc()} className="AddBtn">
            Reset
          </button>
        )}
      </div>
      <div className="add-div">
        <p>Add a new Item to your pantry</p>
        <button onClick={() => setShow(!show)} className="AddBtn">
          {show ? "Close" : "Add Item"}
        </button>
      </div>
      <div className="grid">
        {show && (
          <div className="second-grid">
            <AddInventory
              add={true}
              closeFunc={() => setShow(false)}
              handleSnack={(op) => {
                console.log("open", op);
                setOpen(true);
                setOp(op);
              }}
            />
          </div>
        )}
        <div className="first-grid">
          {loading && <CircularProgress />}
          {!loading && error !== null && <h3>{error}</h3>}
          {!loading && itemList.length > 0 ? (
            <List
              data={itemList}
              handleSnack={(op) => {
                console.log("open in main", op);
                setOpen(true);
                setOp(op);
              }}
            />
          ) : (
            <div className="empty-div">
              <h2>Your Pantry is empty</h2>
            </div>
          )}
        </div>
      </div>
      <SnackBarComp open={open} close={() => setOpen(false)} operation={op} />
    </div>
  );
}

export default InventoryMain;
