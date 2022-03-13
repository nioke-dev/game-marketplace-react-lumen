import React, { useState, useEffect } from "react";
import useGet from "../Hook/useGet";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { set, useForm } from "react-hook-form";
import { link } from "../Axios/link";
import swal from "sweetalert";
import Nav from "./Nav";
import Footer from "./Footer";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const Detail = () => {
  // const { isinya } = useParams();
  let idgameumum = sessionStorage.getItem("idgameumum");
  const [isi] = useGet("/gamesumum/" + idgameumum);
  console.log(isi);
  const { handleSubmit, register } = useForm();

  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  // const [hoverValue, setHoverValue] = useState(undefined);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  // const handleMouseOver = (value) => {
  //   setHoverValue(value);
  // };

  // const handleMouseLeave = (value) => {
  //   setHoverValue(undefined);
  // };

  async function getcommentfnc() {
    const res = await link.get("/commentumum");
    setGetcomment(res.data);
  }

  const [comment, setComment] = useState([]);
  const [getcomment, setGetcomment] = useState([]);

  useEffect(() => {
    let ambil = true;
    async function fetchData() {
      const res = await link.get("/commentumum/" + idgameumum);
      if (ambil) {
        setComment(res.data);
      }
    }

    fetchData();

    return () => {
      ambil = false;
    };
  }, [getcomment]);

  async function komentar(data) {
    swal("error", "harus login dulu bro", "error");
    // let komentar = {
    //   user_id: sessionStorage.getItem("id"),
    //   game_id: idgameumum,
    //   message: data.komentar,
    //   rate: currentValue,
    // };
    // const res = await link.post("/comment", komentar);
    // getcommentfnc();
  }

  return (
    <div>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-lg-6"></div>
        </div>
      </div>
      {isi.map((val, index) => (
        <div className="container" key={index}>
          <h3 className="text-left mb-5 mt-5 font-weight-bold">
            Detail {val.nama_games}
          </h3>
          <div className="row mb-5">
            <div className="col-lg-6">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={0}
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  />
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={1}
                    aria-label="Slide 2"
                  />
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={2}
                    aria-label="Slide 3"
                  />
                </div>

                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={val.gambar} className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={val.gambar} className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={val.gambar} className="d-block w-100" alt="..." />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-header">
                  <h5 className="card-title">Honkai Impact 3rd</h5>
                </div>
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted ">
                    Rp, 235.500
                  </h6>
                  <p className="card-text">{val.description}</p>
                  <table className="table table-borderless table-sm">
                    <tbody>
                      <tr>
                        <td style={{ width: 120 }}>ALL REVIEWS</td>
                        <td>:</td>
                        <td>Mostly Positive (31)</td>
                      </tr>
                      <tr>
                        <td>Realease Date</td>
                        <td>:</td>
                        <td>9 Februari 2022</td>
                      </tr>
                      <tr>
                        <td>Developer</td>
                        <td>:</td>
                        <td>{val.name}</td>
                      </tr>
                      <tr>
                        <td>Publisher</td>
                        <td>:</td>
                        <td>Nioke Dev</td>
                      </tr>
                    </tbody>
                  </table>
                  <button className="btn btn-primary">
                    <i className="fa-solid fa-wallet"></i> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <h3>About This Game</h3>
              <hr />
              <p>
                Honkai Impact 3rd is a next-gen 3D cel-shaded anime action game.
                Experience epic stories and intense battles with Valkyries!
                Honkai is the shadow of civilization that aims to exterminate
                it. The Will of Honkai grew with civilization until it wished to
                inhibit its progress, and thus created Herrschers, humanoid
                beings that possess unthinkable strength. To resist Honkai and
                save our home, you will assume the role of a Captain who
                commands a memorable cast of Valkyries. The bonds you forge will
                become your greatest weapon against Honkai!
              </p>
              <img src={val.gambar} />
              <br />
              <label style={{ fontSize: 20, fontWeight: "bold" }}>
                Main Features:
              </label>
              <ul>
                <li>Hard-hitting Combo Action</li>
              </ul>
              <p>
                Your skills will bring out the full potential of powerful
                Valkyries! Combine their large movesets and you will be playing
                with endless combo possibilities!
              </p>
              <img src={val.gambar} />
              <br />
              <br />
              <h3>System Requirements</h3>
              <hr />
              <div className="row">
                <div className="col-lg-6">
                  <label htmlFor="Mininum">Minimum :</label>
                  <table className="table table-borderless table-sm">
                    <tbody>
                      <tr>
                        <td style={{ width: 80 }}>OS</td>
                        <td>:</td>
                        <td>Windows 7 SPI x64</td>
                      </tr>
                      <tr>
                        <td>Processor</td>
                        <td>:</td>
                        <td>Intel® Core™ i3-6100 or AMD FX-6300</td>
                      </tr>
                      <tr>
                        <td>Memory</td>
                        <td>:</td>
                        <td>8 GB RAM</td>
                      </tr>
                      <tr>
                        <td>Graphics</td>
                        <td>:</td>
                        <td>NVIDIA® GeForce® GTX 660 or AMD</td>
                      </tr>
                      <tr>
                        <td>Directx</td>
                        <td>:</td>
                        <td>Version 11</td>
                      </tr>
                      <tr>
                        <td>Network</td>
                        <td>:</td>
                        <td>Broadband Internet connection</td>
                      </tr>
                      <tr>
                        <td>Storage</td>
                        <td>:</td>
                        <td>15 GB available space</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-lg-6">
                  <label htmlFor="Recomended">Recomended :</label>
                  <table className="table table-borderless table-sm">
                    <tbody>
                      <tr>
                        <td style={{ width: 80 }}>OS</td>
                        <td>:</td>
                        <td>Windows 10 1903 and newer versions</td>
                      </tr>
                      <tr>
                        <td>Processor</td>
                        <td>:</td>
                        <td>Intel Core i5-8400 or AMD Ryzen R5-1600</td>
                      </tr>
                      <tr>
                        <td>Memory</td>
                        <td>:</td>
                        <td>8 GB RAM</td>
                      </tr>
                      <tr>
                        <td>Graphics</td>
                        <td>:</td>
                        <td>NVIDIA GeForce GTX 1060 or AMD Radeon RX 480</td>
                      </tr>
                      <tr>
                        <td>Directx</td>
                        <td>:</td>
                        <td>Version 11</td>
                      </tr>
                      <tr>
                        <td>Network</td>
                        <td>:</td>
                        <td>Broadband Internet connection</td>
                      </tr>
                      <tr>
                        <td>Storage</td>
                        <td>:</td>
                        <td>15 GB available space</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <h3>Komentar</h3>
                  <hr />
                  <div>
                    {stars.map((val, index) => {
                      return (
                        <FaStar
                          key={index}
                          size={24}
                          style={{
                            marginRight: 10,
                            cursor: "pointer",
                          }}
                          color={
                            currentValue > index ? colors.orange : colors.grey
                          }
                          onClick={() => handleClick(index + 1)}
                          // onMouseOver={() => handleMouseOver(index + 1)}
                          // onMouseLeave={handleMouseLeave()}
                        />
                      );
                    })}
                  </div>
                  <br />
                  <form onSubmit={handleSubmit(komentar)}>
                    <textarea
                      name="komentar"
                      id="komentar"
                      cols="10"
                      rows="3"
                      placeholder="Whats Your Feedback"
                      className="form-control"
                      {...register("komentar")}
                    />
                    <br />
                    <button
                      className="btn btn-info mb-5"
                      type="submit"
                      name="submit"
                    >
                      Submit
                    </button>
                  </form>
                  <hr />
                  {comment.map((val, index) => (
                    <div className="row mb-2" key={index}>
                      <div className="col-lg-2">
                        <img
                          src={val.avatar}
                          alt=""
                          className="rounded-circle"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                      <div className="col-lg-10">
                        <label htmlFor="nama" style={{ fontWeight: "bold" }}>
                          {val.name}
                        </label>
                        <br />
                        {val.rate == 1 ? (
                          <div>
                            <FaStar style={{ color: "yellow" }} />
                          </div>
                        ) : val.rate == 2 ? (
                          <div>
                            <FaStar style={{ color: "yellow" }} />
                            <FaStar style={{ color: "yellow" }} />
                          </div>
                        ) : val.rate == 3 ? (
                          <div>
                            <FaStar style={{ color: "yellow" }} />
                            <FaStar style={{ color: "yellow" }} />
                            <FaStar style={{ color: "yellow" }} />
                          </div>
                        ) : val.rate == 4 ? (
                          <div>
                            <FaStar style={{ color: "yellow" }} />
                            <FaStar style={{ color: "yellow" }} />
                            <FaStar style={{ color: "yellow" }} />
                            <FaStar style={{ color: "yellow" }} />
                          </div>
                        ) : (
                          <div>
                            <FaStar style={{ color: "yellow" }} />
                            <FaStar style={{ color: "yellow" }} />
                            <FaStar style={{ color: "yellow" }} />
                            <FaStar style={{ color: "yellow" }} />
                            <FaStar style={{ color: "yellow" }} />
                          </div>
                        )}
                        <p>{val.message}</p>
                      </div>
                      <hr className="mt-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-header">
                  <h5 className="card-title">Languages</h5>
                </div>
                <div className="card-body">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Language</th>
                        <th>Interface</th>
                        <th>Full Audio</th>
                        <th>Subtitles</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>English</td>
                        <td>yes</td>
                        <td>no</td>
                        <td>yes</td>
                      </tr>
                      <tr>
                        <td>French</td>
                        <td>yes</td>
                        <td>no</td>
                        <td>yes</td>
                      </tr>
                      <tr>
                        <td>German</td>
                        <td>yes</td>
                        <td>no</td>
                        <td>yes</td>
                      </tr>
                      <tr>
                        <td>Japanese</td>
                        <td>no</td>
                        <td>yes</td>
                        <td>no</td>
                      </tr>
                      <tr>
                        <td>Simplified Chinese</td>
                        <td>yes</td>
                        <td>no</td>
                        <td>yes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fillOpacity={1}
          d="M0,64L48,74.7C96,85,192,107,288,133.3C384,160,480,192,576,213.3C672,235,768,245,864,224C960,203,1056,149,1152,128C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <Footer />
    </div>
  );
};

export default Detail;
