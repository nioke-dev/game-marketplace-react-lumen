import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
// import Profile from "./Gamer/Profile";
import Headline from "./Headline";
import Login from "../Apps/Login";
import Register from "../Apps/Register";
import Detail from "../Apps/Detail";
const Content = () => {
  const { isi } = useParams();

  let tampil;

  if (isi === "login") {
    tampil = <Login />;
  }
  if (isi === "register") {
    tampil = <Register />;
  }
  if (isi === "detail") {
    tampil = <Detail />;
  }

  return <div>{tampil}</div>;
};

export default Content;
