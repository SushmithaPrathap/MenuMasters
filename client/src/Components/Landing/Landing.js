import React from "react";
import Comp from "./comp";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import "./Landing.scss";

const Landing = () => {
  return (
    <div className="landing-div">
      <Hero />
      <Features />
      <Comp />
      <Footer />
    </div>
  );
};

export default Landing;
