import React, { useEffect, useState } from "react";
import useGet from "../Hook/useGet";
import { link } from "../Axios/link";
import Register from "./Register";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
const Profile = () => {
  const [avatar, setAvatar] = useState("");
  const [pesan, setPesan] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  // const [isi] = useGet("/user/" + sessionStorage.getItem("id"));
  async function setData() {
    const res = await link.get("/user/" + sessionStorage.getItem("id"));
    // console.log(res.data.data[0]);
    setValue("email", res.data.data[0].email);
    setValue("name", res.data.data[0].name);
    setValue("role", res.data.data[0].role);
    // setValue("avatar", res.data.data[0].avatar);
    setAvatar(res.data.data[0].avatar);
  }

  useEffect(() => {
    setData();
  }, []);

  async function update(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("avatar", data.avatar[0]);
    const res = await link
      .post("/user/" + sessionStorage.getItem("id"), formData)
      .then((res) => setPesan(res.data.pesan));

    swal("Good Job!", "Data Berhasil Di Update", "success");
    window.location.reload();
  }
  return (
    <div>
      <div className="text-center">
        <label
          htmlFor="label"
          style={{ fontSize: "50px", fontWeight: "bolder" }}
        >
          Profile Setting
        </label>
      </div>
      <br />
      <div>
        <div className="container">
          {/* {isi.map((val, index) => ( */}
          <form onSubmit={handleSubmit(update)}>
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="type Your Name Here"
                    {...register("name", { required: true })}
                  />
                  {errors.name && "Kolom Name Harus Diisi"}
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="type Your Email Here"
                    {...register("email", { required: true })}
                  />
                  {errors.email && "Kolom Email Harus Diisi"}
                </div>

                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="role"
                    name="role"
                    {...register("role")}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="avatar" className="form-label">
                    Avatar
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="avatar"
                    name="avatar"
                    {...register("avatar")}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <img
                  src={avatar}
                  alt=""
                  className="rounded-circle"
                  style={{
                    width: "200px",
                    height: "200px",
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4">
                <button className="btn btn-primary" name="submit" type="submit">
                  submit
                </button>
              </div>
            </div>
          </form>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
