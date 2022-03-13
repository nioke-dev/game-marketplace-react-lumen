import React from "react";
import useGet from "../Hook/useGet";
import { Link, useHistory } from "react-router-dom";

const Home = () => {
  const [isi] = useGet("/games");
  const history = useHistory();
  sessionStorage.removeItem("iddetail");
  function detail(id) {
    // sessionStorage.setItem("iddetail", id);
    // history.push("/apps/detail");

    history.push(`/apps/detail/${id}`);
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div
            className="col-lg-6 p-5"
            data-aos="fade-right"
            data-aos-duration="3000"
          >
            <h2>
              Beli Berbagai Game Seru Setiap Harinya Hanya di{" "}
              <label style={{ color: "salmon", fontSize: "35px" }}>
                E-Games Store
              </label>
            </h2>
            <label htmlFor="label" style={{ fontSize: "20px" }}>
              Banyak Game Trending Yang Wajib Kamu Mainkan Setiap Harinya Disini
            </label>

            <button
              className="btn btn-primary btn-lg mt-5"
              style={{ borderRadius: "20px" }}
            >
              <i className="fas fa-wallet me-2"></i>Beli Games
            </button>
          </div>
          <div
            className="col-lg-6"
            data-aos="fade-left"
            data-aos-duration="3000"
          >
            <img
              src="/Detail_Games/Marketing2.png"
              alt="img"
              className="img-fluid"
            />
          </div>
        </div>
        <div className="h1 text-center mt-5 mb-5">Trending Games</div>
        <div className="row">
          {isi.map((val, index) => (
            <div
              className="col-lg-4"
              key={index}
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              <div className="card shadow" style={{ width: "100%" }}>
                <img src={val.gambar} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title text-center">{val.nama_games}</h5>
                  <p className="text-center">
                    Created By <a href="">{val.name}</a>
                  </p>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {val.homepage}
                  </h6>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
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
    </div>
  );
};

export default Home;
