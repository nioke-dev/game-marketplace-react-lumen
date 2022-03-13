import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { link } from "../Axios/link";
import swal from "sweetalert";

const Search = () => {
  const { register, handleSubmit, reset } = useForm();
  const history = useHistory();
  const [isi, setIsi] = useState([]);
  async function search(data) {
    if (data.kata == "") {
      swal("Erorrr", "ketikkan dulu kata yang ingi dicari", "error");
    } else {
      const res = await link.post("/games/search", data);
      if (res.data.data.length == "0") {
        swal("Error", "Data Yang Anda Cari Tidak Ada", "error");
      } else {
        setIsi(res.data.data);
        reset();
      }
    }
  }
  console.log(isi);
  function detail(id) {
    history.push(`/apps/detail/${id}`);
  }
  return (
    <div>
      <div className="container mt-5">
        <div className="text-center">
          <h3>Cari Berdasarkan Judul Game</h3>
        </div>
        <h3></h3>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <form className="d-flex" onSubmit={handleSubmit(search)}>
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
            </form>
          </div>
        </div>
        <div className="row mt-5">
          {isi.map((val, index) => (
            <div className="col-lg-4" key={index}>
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

export default Search;
