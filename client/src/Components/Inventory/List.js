import React, { useState } from "react";
import "./Item.scss";
import ItemComp from "./ItemComp";
import Modal from "@mui/material/Modal";
import AddInventory from "./AddInventory";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../../Utils/inventory-api";

import SnackBarComp from "../Common/SnackBar";

const List = ({ data, handleSnack }) => {
  let dispatch = useDispatch();
  console.log(data);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);
  const [item, setItem] = useState({});
  const [id, setId] = useState("");
  const [op, setOp] = useState("");

  const editHandle = (item) => {
    console.log("edit ", item);
    setShow(true);
    setItem(item);
  };

  const delHandle = (id) => {
    console.log("del handle ", id);
    setDel(true);
    setId(id);
  };

  const delFunc = () => {
    dispatch(deleteItem(id));
    // setOpen(true);
    // setOp("Item Deleted");
    handleSnack({ value: "Item Deleted Successfully!", status: "success" });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="listComp-div">
        {data && (
          <>
            {data.map((item) => (
              <ItemComp
                key={item.id}
                item={item}
                editFunc={(item) => editHandle(item)}
                delFunc={(id) => delHandle(id)}
              />
            ))}
          </>
        )}
      </div>
      <Modal open={show} onClose={() => setShow(false)}>
        <AddInventory
          add={false}
          item={item}
          closeFunc={() => setShow(false)}
          handleSnack={(op) => {
            console.log("op in list", op);
            handleSnack(op);
          }}
        />
      </Modal>
      <Modal
        open={del}
        onClose={() => setDel(false)}
        slotProps={{ backdrop: "visible" }}
      >
        <div className="del-modal">
          <p> Are you sure you want to delete ?</p>
          <div class="submit-div">
            <button
              id="submit-btn"
              type="submit"
              class="clear-btn"
              onClick={() => setDel(false)}
            >
              No
            </button>
            <button
              id="submit-btn"
              type="submit"
              class="create-btn"
              onClick={() => delFunc()}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <SnackBarComp open={open} close={() => setOpen(false)} operation={op} />
    </div>
  );
};

export default List;
