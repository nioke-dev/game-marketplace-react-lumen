import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";
import Register from "./Register";
import Gamecrud from "./Gamecrud";
import Home from "./Home";
import Detail from "./Detail";
import Search from "./Search";
import Verifikasidev from "./VerifikasiDev";
import Review from "./Review";
const Content = () => {
  const { isinya } = useParams();

  let tampil;

  if (isinya === "profile") {
    tampil = <Profile />;
  }
  if (isinya === "register") {
    tampil = <Register />;
  }
  if (isinya === "login") {
    tampil = <Login />;
  }
  if (isinya === "game") {
    tampil = <Gamecrud />;
  }
  if (isinya === "home") {
    tampil = <Home />;
  }
  // if (isi === "detail/:id") {
  //   tampil = <Detail />;
  // }
  if (isinya === "search") {
    tampil = <Search />;
  }
  if (isinya === "verifikasi") {
    tampil = <Verifikasidev />;
  }
  if (isinya === "review") {
    tampil = <Review />;
  }
  return <div>{tampil}</div>;
};

export default Content;
