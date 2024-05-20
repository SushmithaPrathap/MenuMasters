import React from "react"; //importing react
import "./common.scss"; //defining the scss file for snackbar component
import Snackbar from "@mui/material/Snackbar";  //importing material UI snack bar component

const SnackBarComp = ({ open, close, operation }) => {    //We define the snack bar component and the notification component closes after 1500
  return (
    <Snackbar open={open} autoHideDuration={1500} onClose={() => close()}> 
      <div className="snackbar-div">
        {/* {operation !== "error" ? } */}
        <p
          style={{ color: operation.status === "success" ? "#1876d1" : "red" }}
        >
          {operation.value}   
        </p>
      </div>
    </Snackbar> 
  );
};

export default SnackBarComp; //Exporting the snack bar component
