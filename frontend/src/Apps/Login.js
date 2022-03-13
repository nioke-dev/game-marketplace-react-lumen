import React, { useState } from "react";
import { link } from "../Axios/link";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../Umum/Footer";
import Nav from "../Umum/Nav";

const Login = () => {
  const history = useHistory();
  const [pesan, setPesan] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const gettoken = () => sessionStorage.getItem("token");

  async function simpan(data) {
    const res = await link.post("/login", data);
    setPesan(res.data.pesan);
    let token = res.data.token;
    let email = res.data.data.email;
    let role = res.data.data.role;
    let id = res.data.data.id;

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("role", role);
    reset();

    if (gettoken() != "undefined") {
      history.push("/apps/home");
      swal("Good job!", "login berhasil", "success");
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    } else {
      if (
        res.data.pesan === "login gagal publisher belum verifikasi data anda"
      ) {
        swal("error", res.data.pesan, "error");
      } else {
        swal("Failed", "login Gagal Cek Username dan Password Anda!", "error");
      }
    }
  }

  return (
    <div>
      <Nav />
      <section className="vh-100" style={{ backgroundColor: "#fffff" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <form onSubmit={handleSubmit(simpan)}>
                  <div className="card-body p-5 text-center">
                    <h3 className="mb-5">Sign in</h3>
                    <div className="form-floating mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="name@example.com"
                        {...register("email", { required: true })}
                      />
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      {errors.email && "kolom email harus diisi!!!"}
                    </div>

                    <div className="form-floating mb-4">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="type your password here"
                        {...register("password", { required: true })}
                      />
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      {errors.password && "kolom password harus diisi"}
                    </div>
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>
                    <br />
                    <label htmlFor="dont-have-account">
                      Dont Have Account? <Link to="/register">CLick Here</Link>
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
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

export default Login;
