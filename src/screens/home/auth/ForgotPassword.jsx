import React, { useState } from "react";
import { forgotPassword } from "../../../service/api";
export default function ForgotPassword() {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await forgotPassword({
      email: text,
    });
    console.log(response);
    setMsg(response.data.message);
  };
  const handleClick = (e) => {
    setText(e.target.value);
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="bg-white container" style={{ height: "50%" }}>
        <div className="d-flex flex-column justify-content-center align-items-center mt-3">
          <div
            className=" icons"
            style={{ backgroundColor: "rgba(100, 150, 19, 0.1)" }}
          >
            <i className="fas fa-key" style={{ color: "#b000e0" }}></i>
          </div>
          <div className="mt-2">
            <h3 style={{ fontStyle: "'Varela', sans-serif" }}>
              Forgot Password ?
            </h3>
          </div>
          <div className="">
            <p className="font-weight-light">
              No worries, we'll send you reset instructions.
            </p>
          </div>
        </div>
        <div
          className="d-flex text-center mt-3 flex-column justify-content-center align-items-center"
          style={{ width: "100%" }}
        >
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                value={text}
                onChange={handleClick}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            {msg && <div className="text-success">{msg}</div>}
            <button type="submit" class="btn btn-primary">
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
