import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Headline from "./Headline";
import Detail from "./Detail";
import Content from "./Content";
import Register from "../Apps/Login";
import Login from "../Apps/Login";
const Main = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Headline />
          </Route>
          {/* <Route path="/detail">
            <Detail />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route> */}
        </Switch>
      </Router>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fillOpacity={1}
          d="M0,64L48,74.7C96,85,192,107,288,133.3C384,160,480,192,576,213.3C672,235,768,245,864,224C960,203,1056,149,1152,128C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default Main;
