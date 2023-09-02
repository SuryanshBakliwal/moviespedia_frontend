import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forVerify } from "../../../service/api";

export default function ForVerify() {
  const [msg, setMsg] = useState("");
  // const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
  });
  const handleCredentails = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forVerify({
        email: credentials.email,
      });
      console.log(response);
      setMsg(response.data.message);
      // navigate("/login");
    } catch (error) {}
  };
  return (
    <div>
      <div
        className="container d-flex justify-content-center mt-5"
        style={{ width: "40%" }}
      >
        <div className="card">
          <div
            className="bg-dark d-flex justify-content-center align-items-center mt-3"
            style={{ height: "60px", background: "black" }}
          >
            <i
              className="fa-regular fa-envelope"
              style={{ fontSize: "35px", color: "#b80000" }}
            ></i>
          </div>
          <div className="card-body">
            <h5 className="card-title">Email Verification</h5>
            <p className="card-text">
              Hi, You're almost set to start enjoying our services. Simply click
              the link to verfiy your email address and get started. The link
              expires in 48 hour.
            </p>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div class="mb-3">
                <input
                  type="email"
                  name="email"
                  id="form3Example3cg"
                  value={credentials.email}
                  onChange={handleCredentails}
                  className="form-control form-control-lg"
                />
                <label className="form-label" for="form3Example3cg">
                  Your Email
                </label>{" "}
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              {msg && <div className="text-success">{msg}</div>}

              <button
                className="btn btn-primary btn-danger"
                onClick={handleSubmit}
                type="submit"
              >
                Verify my email address
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
