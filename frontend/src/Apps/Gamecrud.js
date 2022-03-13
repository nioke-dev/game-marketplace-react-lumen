import React, { useState, useEffect } from "react";
import { link } from "../Axios/link";
import useGet from "../Hook/useGet";
// import Modal from "react-modal";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import useDelete from "../Hook/useDelete";
import { Modal, Button } from "react-bootstrap";

// Modal.setAppElement("#root");

const Gamecrud = () => {
  const [isi] = useGet("/gamescrud");
  const { hapus, pesanhapus, setPesanhapus } = useDelete("/games/");

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [msopen, setMsopen] = useState(false);
  const [mcopen, setMcopen] = useState(false);
  const [muopen, setMuopen] = useState(false);
  const [games, setGames] = useState([]);
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    let ambil = true;
    async function fetchData() {
      const res = await link.get("/userdev");
      if (ambil) {
        setGames(res.data);
      }
    }

    fetchData();

    return () => {
      ambil = false;
    };
  }, []);

  function simpan(data) {
    const formData = new FormData();
    formData.append("developer_id", data.developer_id);
    formData.append("nama_games", data.nama_games);
    formData.append("description", data.description);
    formData.append("homepage", data.homepage);
    formData.append("status", data.status);
    formData.append("gambar", data.gambar[0]);

    link.post("/games", formData).then((res) => setPesan(res.data.pesan));
    reset();
    setMcopen(false);
    swal("Good Job!", "Data Berhasil Ditambahkan", "success");
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

  async function edit(id) {
    setMuopen(true);
    const res = await link.get("/games/" + id);
    console.log(res.data[0].gambar);
    setValue("id", res.data[0].id);
    setValue("developer_id", res.data[0].developer_id);
    setValue("nama_games", res.data[0].nama_games);
    setValue("description", res.data[0].description);
    setValue("homepage", res.data[0].homepage);
    setValue("status", res.data[0].status);
  }
  function refresh() {
    window.location.reload();
  }
  async function update(data) {
    const id = data.id;
    const formData = new FormData();
    formData.append("developer_id", data.developer_id);
    formData.append("nama_games", data.nama_games);
    formData.append("description", data.description);
    formData.append("homepage", data.homepage);
    formData.append("status", data.status);
    formData.append("gambar", data.gambar[0]);
    const res = await link
      .post("/games/" + id, formData)
      .then((res) => setPesan(res.data.pesan));
    swal("Good Job!", "Data Berhasil Di Update", "success");
    setMuopen(false);
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {/* Modal Update Start */}
      <Modal show={muopen} onHide={() => setMuopen(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Update Games</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <form onSubmit={handleSubmit(update)}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="developer">
                    Developer
                  </label>
                  <select
                    name="developer_id"
                    className="form-select"
                    id="developer_id"
                    {...register("developer_id", { required: true })}
                  >
                    {games.map((val, index) => (
                      <option key={index} value={val.id}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </div>
                <input type="hidden" name="id" />
                <div className="mb-3">
                  <label className="form-label" htmlFor="nama_games">
                    Nama Game
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nama_games"
                    placeholder="nama_games"
                    // ref={register}
                    {...register("nama_games", { required: true })}
                  />
                  {errors.nama_games && "Kolom Nama Harus Diisi"}
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder="Description"
                    id="description"
                    rom={3}
                    {...register("description", { required: true })}
                  />
                  {errors.description && "Kolom Description Harus Diisi"}
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="homepage">
                    Home Page
                  </label>
                  <textarea
                    name="homepage"
                    className="form-control"
                    placeholder="homepage"
                    id="homepage"
                    rom={3}
                    {...register("homepage", { required: true })}
                  />
                  {errors.homepage && "Kolom Description Harus Diisi"}
                </div>

                {sessionStorage.getItem("role") === "developer" ? (
                  ""
                ) : (
                  <div className="mb-3">
                    <label className="form-label" htmlFor="status">
                      status
                    </label>
                    <select
                      name="status"
                      id="status"
                      className="form-select"
                      placeholder="status"
                      {...register("status", { required: true })}
                    >
                      <option value={0}>Tidak Aktif</option>
                      <option value={1}>Aktif</option>
                    </select>
                    {errors.status && "Kolom Status Harus Diisi"}
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label" htmlFor="gambar">
                    gambar
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="gambar"
                    placeholder="gambar"
                    {...register("gambar")}
                  />
                </div>
                <Modal.Footer>
                  <div className="mb-3">
                    <input
                      type="button"
                      className="btn btn-danger me-2"
                      name="batal"
                      value="Batal"
                      onClick={() => setMuopen(false)}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      name="submit"
                    >
                      Submit
                    </button>
                  </div>
                </Modal.Footer>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* Modal Update End */}

      <Modal show={mcopen} onHide={() => setMcopen(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Create Games</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <form onSubmit={handleSubmit(simpan)}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="developer">
                    Developer
                  </label>
                  <select
                    name="developer_id"
                    className="form-select"
                    id="developer_id"
                    {...register("developer_id", { required: true })}
                  >
                    {games.map((val, index) => (
                      <option key={index} value={val.id}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="nama_games">
                    Nama Game
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nama_games"
                    placeholder="nama_games"
                    // ref={register}
                    {...register("nama_games", { required: true })}
                  />
                  {errors.nama_games && "Kolom Nama Harus Diisi"}
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder="Description"
                    id="description"
                    rom={3}
                    {...register("description", { required: true })}
                  />

                  {errors.description && "Kolom Description Harus Diisi"}
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="homepage">
                    Home Page
                  </label>
                  <textarea
                    name="homepage"
                    className="form-control"
                    placeholder="homepage"
                    id="homepage"
                    rom={3}
                    {...register("homepage", { required: true })}
                  />

                  {errors.homepage && "Kolom Description Harus Diisi"}
                </div>
                {sessionStorage.getItem("role") === "developer" ? (
                  ""
                ) : (
                  <div className="mb-3">
                    <label className="form-label" htmlFor="status">
                      status
                    </label>
                    <select
                      name="status"
                      id="status"
                      className="form-select"
                      placeholder="status"
                      {...register("status", { required: true })}
                    >
                      <option value={0} selected>
                        Tidak Aktif
                      </option>
                      <option value={1}>Aktif</option>
                    </select>
                    {errors.status && "Kolom Status Harus Diisi"}
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label" htmlFor="gambar">
                    gambar
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="gambar"
                    placeholder="gambar"
                    // ref={register}
                    {...register("gambar")}
                  />
                  {errors.gambar && "Kolom gambar Harus Diisi"}
                </div>
                <Modal.Footer>
                  <div className="mb-3">
                    <input
                      type="button"
                      className="btn btn-danger me-2"
                      name="batal"
                      value="Batal"
                      onClick={() => setMcopen(false)}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      name="submit"
                    >
                      Submit
                    </button>
                  </div>
                </Modal.Footer>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-6">
            <h2>Games Advanced Management</h2>
          </div>
          <div className="col-lg-6 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={() => setMcopen(true)}>
              <i className="fas fa-plus me-2"></i>Create Games
            </button>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-hover table-light">
              <thead>
                <tr>
                  <th>Developer</th>
                  <th>Nama</th>
                  <th>Deskripsi</th>
                  <th>Home Page</th>
                  <th>Status</th>
                  <th>Gambar</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isi.map((val, index) => (
                  <tr key={index}>
                    {/* modal show open */}
                    <Modal
                      isOpen={msopen}
                      onRequestClose={() => setMsopen(false)}
                      style={{
                        overlay: {
                          background: "transparent !important",
                        },
                        content: {
                          top: "50%",
                          left: "50%",
                          right: "auto",
                          bottom: "auto",
                          marginRight: "-50%",
                          transform: "translate(-50%, -50%)",
                          width: "40%",
                        },
                      }}
                    >
                      <div className="modal-header">
                        <h3>Show Image</h3>
                      </div>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-lg-12">
                            <img
                              src={val.gambar}
                              className="img-fluid"
                              style={{ width: "500px" }}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          className="btn btn-danger"
                          onClick={() => setMsopen(false)}
                        >
                          Close
                        </button>
                      </div>
                    </Modal>
                    {/* modal show close */}

                    <td>{val.name}</td>
                    <td>{val.nama_games}</td>
                    <td>{val.description}</td>
                    <td>{val.homepage}</td>
                    <td>{val.status == 1 ? "Aktif" : "Tidak Aktif"}</td>
                    <td>
                      <img src={val.gambar} alt="" style={{ width: "100px" }} />
                    </td>
                    <td>
                      {/* <button
                        className="btn btn-info btn-sm mb-2"
                        onClick={() => setMsopen(true)}
                      >
                        Show
                      </button> */}
                      {/* <br /> */}
                      <button
                        className="btn btn-warning btn-sm mb-2"
                        onClick={() => edit(val.id)}
                      >
                        <i className="fas fa-pen me-2"></i>Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => hapus(val.id)}
                      >
                        <i className="fas fa-trash-can me-2"></i>Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamecrud;
