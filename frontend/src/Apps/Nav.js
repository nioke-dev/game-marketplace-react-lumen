import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link, useRouteMatch } from "react-router-dom";
import swal from "sweetalert";
import Search from "./Search";

const Nav = () => {
  const history = useHistory();
  let location = useLocation();
  console.log(location.pathname);
  const { url, path } = useRouteMatch();

  const { handleSubmit, register } = useForm();

  function logout() {
    sessionStorage.clear();
    swal("Nice", "Berhasil Logout", "success");
    history.push("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to={`${url}`}>
            E-Games
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link {location.pathname == /apps/home ? 'active' : ''}"
                  aria-current="page"
                  to={`${url}/home`}
                >
                  {sessionStorage.getItem("role") === "gamer" ||
                  sessionStorage.getItem("role") === "developer" ||
                  sessionStorage.getItem("role") === "publisher"
                    ? "Home"
                    : ""}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link {location.pathname == /apps/profile ? 'active' : ''}"
                  to={`${url}/profile`}
                >
                  {sessionStorage.getItem("role") === "gamer" ||
                  sessionStorage.getItem("role") === "developer" ||
                  sessionStorage.getItem("role") === "publisher"
                    ? "Profile"
                    : ""}
                </Link>
              </li>
              <li className="nav-item">
                {sessionStorage.getItem("role") === "developer" ||
                sessionStorage.getItem("role") === "publisher" ? (
                  <Link
                    className="nav-link {location.pathname == /apps/game ? 'active' : ''}"
                    to={`${url}/game`}
                  >
                    Game Crud
                  </Link>
                ) : (
                  ""
                )}
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link {location.pathname == /apps/search ? 'active' : ''}"
                  to={`${url}/search`}
                >
                  {sessionStorage.getItem("role") === "gamer" ||
                  sessionStorage.getItem("role") === "developer" ||
                  sessionStorage.getItem("role") === "publisher"
                    ? "Search"
                    : ""}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link {location.pathname == /apps/verifikasi ? 'active' : ''}"
                  to={`${url}/verifikasi`}
                >
                  {sessionStorage.getItem("role") === "publisher"
                    ? "Verifikasi"
                    : ""}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link {location.pathname == /apps/review ? 'active' : ''}"
                  to={`${url}/review`}
                >
                  {sessionStorage.getItem("role") === "publisher"
                    ? "Review"
                    : ""}
                </Link>
              </li>
            </ul>
            {/* <form className="d-flex" onSubmit={handleSubmit(search)}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="kata"
                {...register("kata")}
              />
              <button className="btn btn-outline-success me-5" type="submit">
                Search
              </button>
            </form> */}
            <button
              className="btn btn-outline-danger"
              onClick={logout}
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
