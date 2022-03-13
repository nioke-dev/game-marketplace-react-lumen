import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { link } from "../Axios/link";
import swal from "sweetalert";
import Modal from "react-modal";
import { useHistory, Link } from "react-router-dom";
import Nav from "../Umum/Nav";
import Footer from "../Umum/Footer";

Modal.setAppElement("#root");
const Register = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const [pesan, setPesan] = useState("");

  async function simpan(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("avatar", data.avatar[0]);
    formData.append("role", data.role);
    formData.append("password", data.password);
    const res = await link
      .post("/register", formData)
      .then((res) => setPesan(res.data.pesan));
    reset();
  }
  if (pesan === "berhasil registrasi") {
    swal("Good job!", "Berhasil Registrasi Akun, silahkan login", "success");
    history.push("/login");
  }

  return (
    <div>
      <Nav />
      <div className="container">
        <div className="col-lg-6" style={{ margin: "auto" }}>
          <div className="card mt-5 mb-5 shadow">
            <div className="card-header">
              <h5>Register</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(simpan)}>
                <div className="mb-3 form-group">
                  <label htmlFor="name" className="form-label">
                    Name :
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="nam"
                    className="form-control"
                    placeholder="Type Your Name Here"
                    {...register("name", { required: true })}
                  />
                  <span>{errors.name && "Kolom Menu Name Diisi"}</span>
                </div>
                <div className="mb-3 form-group">
                  <label htmlFor="email" className="form-label">
                    Email :
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Type Password Here"
                    {...register("email", { required: true })}
                  />
                  <span>{errors.email && "Kolom Email Harus Diisi"}</span>
                </div>
                <div className="mb-3 form-group">
                  <label htmlFor="avatar" className="form-label">
                    Avatar :
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    className="form-control"
                    {...register("avatar", { required: true })}
                  />
                  <span>{errors.avatar && "Kolom Avatar Harus Diisi"}</span>
                </div>
                <div className="mb-3 form-group">
                  <label htmlFor="password" className="form-label">
                    Role :
                  </label>
                  <select
                    name="role"
                    id="role"
                    className="form-select"
                    {...register("role")}
                  >
                    <option value="developer">Developer</option>
                    <option value="gamer">Gamer</option>
                    <option value="publisher">Publisher</option>
                  </select>
                </div>
                <div className="mb-3 form-group">
                  <label htmlFor="password" className="form-label">
                    Password :
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Type Password Here"
                    {...register("password", { required: true })}
                  />
                  <span>{errors.password && "Kolom Password Harus Diisi"}</span>
                </div>
                <div className="mb-3 form-group">
                  <button className="btn btn-primary">Register</button>
                </div>
                <div className="text-center">
                  <label htmlFor="already-have-account">
                    Alraeady Have Any Account?{" "}
                    <Link to="/login">Login Now</Link>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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

export default Register;
