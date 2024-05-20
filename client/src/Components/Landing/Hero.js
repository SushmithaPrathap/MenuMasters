import { Button } from "@mui/material";
import React from "react";
import bg from "../../images/bg1.jpeg";
import { Link } from "react-router-dom";
import "./Landing.scss";

const Hero = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundColor: "#cccccc",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "80vh",
        }}
        className="hero-div"
      ></div>

      <div class="bg-text">
        <h1>We are Menu Masters</h1>
        <h4>Its always better to cook with us</h4>
        {/* <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit
          amet dolor dui. Integer felis turpis, faucibus a ornare sit amet,
          vulputate id felis.
        </p> */}
        <Button
          variant="contained"
          component={Link}
          to="/login"
          style={{
            backgroundColor: "#fff",
            color: "#1876d1",
            fontSize: "18px",
            fontWeight: "bold",
            margin: "10px",
          }}
        >
          Get Started Now
        </Button>
      </div>
    </>
  );
};

export default Hero;
