// import logo from "./logo.svg";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Apps from "./Apps/Apps";
import Headline from "./Umum/Headline";
import Umum from "./Umum/Umum";
import Login from "./Apps/Login";
import Register from "./Apps/Register";
import Detail from "./Umum/Detail";

function App() {
  return (
    <Router>
      <Route path="/" component={Umum} exact />
      <Route path="/detail" component={Detail} exact />
      {/* <Route path="/Home" component={Headline} /> */}
      <Route path="/apps" component={Apps} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Router>
  );
}

export default App;
