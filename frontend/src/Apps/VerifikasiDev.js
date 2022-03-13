import React from "react";
import useGet from "../Hook/useGet";
import useGettr from "../Hook/useGettr";
import { link } from "../Axios/link";

const Verifikasidev = () => {
  const [isi] = useGettr("/userdev");

  async function SwitchDevStat(data) {
    let dataupdate = {
      status: data,
    };

    const res = await link.put("/user/" + data, dataupdate);
  }

  let no = 1;
  return (
    <div>
      <div className="container">
        <h2>Daftar Developer</h2>
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Avatar</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isi.map((val, index) => (
              <tr key={index}>
                <td>{no++}</td>
                <td>{val.nama}</td>
                <td>{val.email}</td>
                <td>
                  <img
                    src={val.avatar}
                    alt=""
                    className="rounded-circle"
                    style={{ width: "80px", height: "80px" }}
                  />
                </td>
                <td>{val.status === 0 ? "Tidak Aktif" : "Aktif"}</td>
                <td>
                  <button
                    className={
                      val.status === 0
                        ? "btn btn-sm btn-primary"
                        : "btn btn-sm btn-danger"
                    }
                    onClick={() => SwitchDevStat(val.id)}
                  >
                    {val.status === 0 ? "Aktifkan" : "Nonaktifkan"}
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

export default Verifikasidev;
