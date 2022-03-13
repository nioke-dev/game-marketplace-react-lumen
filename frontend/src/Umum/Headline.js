import React from "react";
import useGet from "../Hook/useGet";
import { Link, useHistory } from "react-router-dom";

const Headline = () => {
  sessionStorage.removeItem("idgameumum");
  const [isi] = useGet("/gamesumum");
  const history = useHistory();
  function detail(id) {
    history.push("/detail");
    sessionStorage.setItem("idgameumum", id);
    window.location.reload();
  }
  return (
    <div className="container mt-5">
      <div className="row">
        {isi.map((val, index) => (
          <div className="col-lg-4" key={index}>
            <div className="card shadow" style={{ width: "100%" }}>
              <img src={val.gambar} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-center">{val.nama_games}</h5>
                <p className="text-center">
                  Created By <a>{val.name}</a>
                </p>
                <h6 className="card-subtitle mb-2 text-muted text-center">
                  {val.homepage}
                </h6>
                <p className="text-center"></p>
                <div className="text-center">
                  {/* <Link to={"/Detail"} className="btn btn-primary btn-sm">
                    See Detail
                  </Link> */}
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => detail(val.id)}
                  >
                    See Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Headline;
