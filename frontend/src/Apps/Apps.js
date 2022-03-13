import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import Main from "./Main";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
const Apps = () => {
  if (
    sessionStorage.getItem("token") === "undefined" ||
    sessionStorage.getItem("token") === null
  ) {
    swal("Good job!", "Hayooo Login Dulu Dong!!!", "error");
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Nav />
      <Main />
      <Footer />
    </div>
  );
};

export default Apps;
