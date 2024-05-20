import React from "react";
import moment from "moment";
import "./Item.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ItemComp({ item, editFunc, delFunc }) {
  console.log(item);
  const edit = () => {
    console.log("in edit");
    editFunc(item);
  };
  const del = () => {
    console.log("in del func");
    delFunc(item.id);
  };
  return (
    <div className="item-main">
      <div className="item-div-header">
        <h2>{item.name}</h2>
        <div>
          <EditIcon
            onClick={() => edit()}
            style={{ color: "#fff", margin: "0px 10px", cursor: "pointer" }}
          />
          <DeleteIcon
            onClick={() => del()}
            style={{ color: "#fff", margin: "0px 10px", cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="item-content">
        <div className="item-content-div">
          <div>
            <h4>Category: </h4>
            <h3>{item.category}</h3>
          </div>
          <div>
            <h4>Quantity: </h4>
            <h3>
              {item.quantity} {item.unit}
            </h3>
          </div>
          <div>
            <h4>Nutrition Value: </h4>
            <h3>{item.nutrition}</h3>
          </div>
        </div>
        <div className="item-content-div">
          <div>
            <h4>Purchased Date: </h4>
            <h3>{moment(item.purchased).format("MMMM Do YYYY")}</h3>
          </div>
          <div>
            <h4>Used By: </h4>
            <h3>{moment(item.usedBy).format("MMMM Do YYYY")}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemComp;
