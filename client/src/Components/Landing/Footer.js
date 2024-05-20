import React from "react";
import "./Landing.scss";
import image from "../../images/cooking.png";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

const Footer = () => {
  return (
    <div className="footer-div">
      <div className="name-div">
        <LocalDiningIcon
          style={{ color: "#ffffff", fontSize: "150px", margin: "10px" }}
        />
        <h1>Menu Masters</h1>
        <h4>Its always better to cook with us</h4>
      </div>
      <div className="names-div">
        <h1>Contributors</h1>
        <ul>
          <li>Sushmitha Prathap</li>
          <li>Nishith</li>
          <li>Aditya Saurav Vijay</li>
          <li>Suprith KP</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
