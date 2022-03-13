import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import useGettr from "../Hook/useGettr";
import { link } from "../Axios/link";

const Review = () => {
  const [isi] = useGettr("/gamescrud");
  const [userdev, setUserdev] = useState([]);

  const [detailgames, setDetailgames] = useState([]);
  const [detail, setDetail] = useState(false);

  async function Details(id) {
    const res = await link.get("/games/" + id);
    setDetailgames(res.data);
    setDetail(true);
  }

  async function switchreview(data) {
    let dataupdate = {
      status: data,
    };

    const res = await link.put("/games/" + data, dataupdate);
  }

  return (
    <div>
      {/* modal detail open */}
      <Modal show={detail} onHide={() => setDetail(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detail Games</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailgames.map((val, index) => (
            <div className="row">
              <div className="col-lg-8">
                <table className="table table-borderless">
                  <tr>
                    <td width="110px">Developer</td>
                    <td width="20px">:</td>
                    <td>{val.name}</td>
                  </tr>
                  <tr>
                    <td>Nama Games</td>
                    <td>:</td>
                    <td>{val.nama_games}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>:</td>
                    <td>{val.description}</td>
                  </tr>
                  <tr>
                    <td>Home Page</td>
                    <td>:</td>
                    <td>{val.homepage}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>:</td>
                    <td>{val.status === 1 ? "Aktif" : "Tidak Aktif"}</td>
                  </tr>
                </table>
              </div>
              <div className="col-lg-4">
                <img src={val.gambar} alt="" className="img-fluid" />
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
      {/* modal detail close */}

      <div className="container mt-5">
        <h2>Daftar Publikasi Game</h2>
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th>Developer</th>
              <th>Nama Games</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isi.map((val, index) => (
              <tr key={index}>
                <td>{val.name}</td>
                <td>{val.nama_games}</td>
                <td>{val.status === 0 ? "Tidak Aktif" : "Aktif"}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => Details(val.id)}
                  >
                    Detail
                  </button>
                  <button
                    className={
                      val.status === 1 ? "btn btn-danger" : "btn btn-success"
                    }
                    onClick={() => switchreview(val.id)}
                  >
                    {val.status === 1 ? "Nonaktifkan" : "Aktifkan"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Review;
