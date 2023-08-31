import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../../service/api";

export default function Signup() {
  const [msg, setMsg] = useState("");
  // const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      const response = await createUser({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        confirmPassword: credentials.confirmPassword,
      });
      console.log(response);
      // const response = await fetch("http://localhost:8000/createuser", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name: credentials.name,
      //     email: credentials.email,
      //     password: credentials.password,
      //     confirmPassword: credentials.confirmPassword,
      //   }),
      // });
      // let json = await response.json();
      setMsg(response.data.message);
      // navigate("/login");
    } catch (error) {

    }
  };

  return (
    <>
      <section
        className=" bg-image"
        style={{
          background: "url('https://source.unsplash.com/random/?movies')",
          backgroundRepeat: "no-repeat",
          objectFit: "fill",
          backgroundSize: "100% 70%",
        }}
      >
        <div className="mask d-flex align-items-center gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card m-3" style={{ borderRadius: " 15px" }}>
                  <div className="card-body">
                    <h2 className="text-uppercase text-center m-4">
                      Create an account
                    </h2>
                    <form onSubmit={handleSubmit} autoComplete="off">
                      <div className="form-outline mb-2">
                        <input
                          type="text"
                          name="name"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          value={credentials.name}
                          onChange={handleCredentails}
                        />
                        <label className="form-label" for="form3Example1cg">
                          Your Name
                        </label>
                      </div>

                      <div className="form-outline mb-2">
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
                        </label>
                      </div>

                      <div className="form-outline mb-2">
                        <input
                          type="password"
                          name="password"
                          id="form3Example4cg"
                          onChange={handleCredentails}
                          value={credentials.password}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="form3Example4cg">
                          Password
                        </label>
                      </div>

                      <div className="form-outline mb-2">
                        <input
                          type="password"
                          name="confirmPassword"
                          id="form3Example4cdg"
                          className="form-control form-control-lg"
                          value={credentials.confirmPassword}
                          onChange={handleCredentails}
                        />
                        <label className="form-label" for="form3Example4cdg">
                          Confirm Password
                        </label>
                      </div>
                      {msg && <div className="text-success">{msg}</div>}
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          value="Submit"
                          onClick={handleSubmit}
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-3 mb-0">
                        Have already an account?{" "}
                        <Link to="/login" className="">
                          Login
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
