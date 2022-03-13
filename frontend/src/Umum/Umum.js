import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import Main from "./Main";

const Umum = () => {
  return (
    <div>
      <div className="navbar-top-1">
        <Nav />
      </div>
      <div>
        <Main />
      </div>
      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default Umum;
