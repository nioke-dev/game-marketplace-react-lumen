import React from "react";

const Footer = () => {
  return (
    <div>
      <section id="footer">
        <div style={{ backgroundColor: "#0099ff", height: 700, width: "100%" }}>
          <div className="container text-white">
            <div className="row">
              <div className="col-lg-6">
                <div
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "white",
                    borderRadius: "50%",
                  }}
                ></div>
                <label style={{ fontSize: 30, fontWeight: "bold" }}>
                  E-games Store
                </label>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Voluptate, laboriosam quam amet rerum est a excepturi.
                  Eligendi odio recusandae ex nesciunt ut explicabo reiciendis,
                  eaque laudantium doloribus perferendis, porro necessitatibus.
                </p>
                <label style={{ fontSize: 20, fontWeight: "bold" }}>
                  Subscribe Now!!
                </label>
                <div className="mb-3 input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type Your Email Here"
                    aria-describedby="helpId"
                    style={{ borderRadius: 15 }}
                  />
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    style={{ borderRadius: 15 }}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="col-lg-6">
                <label style={{ fontSize: 30, fontWeight: "bold" }}>
                  Follow Me in Social Media
                </label>
                <br />
                <i className="fa-brands fa-instagram fa-3x" />
                <i className="fa-brands fa-facebook fa-3x ms-5" />
                <i className="fa-brands fa-twitter fa-3x ms-5" />
                <i className="fa-brands fa-github fa-3x ms-5" />
                <i className="fa-brands fa-linkedin fa-3x ms-5" />
                <br />
                <br />
                <label style={{ fontSize: 20, fontWeight: "bold" }}>
                  Need help?
                </label>
                <br />
                <br />
                <label style={{ fontSize: 20, fontWeight: "bold" }}>
                  Call Us :
                </label>
                <br />
                <label>+62 852 - 3153 - 3324</label>
                <br />
                <br />
                <label style={{ fontSize: 20, fontWeight: "bold" }}>
                  General Inquiries :
                </label>
                <br />
                <label>infoegames@store.com</label>
                <br />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
