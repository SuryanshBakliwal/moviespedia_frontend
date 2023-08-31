import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../service/api";

export default function Login() {
  // let dispatch = useDispatchUser();
  // let userState = useUser();
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleInfo = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await loginUser({
      email: loginInfo.email,
      password: loginInfo.password,
    });
    console.log(response);
    if (!response.data.message) {
      alert("Enter Valid Crentails");
    }
    if (response.data.message && response.data.userId) {
      localStorage.setItem("authToken", response.data.authToken);
      localStorage.setItem("mailId", loginInfo.email);
      console.log(response.data.userId);
      navigate("/home");
    }
  };

  return (
    <>
      <div>
        <section className="vh-100" style={{ backgroundColor: "darkgray" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6 text-black">
                <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                  <form
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    style={{ width: "23rem" }}
                  >
                    <div
                      className="fs-3 mb-3 pb-3"
                      style={{ fontFamily: "monospace" }}
                    >
                      Sign into your account
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        name="email"
                        id="form2Example18"
                        value={loginInfo.email}
                        onChange={handleInfo}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="form2Example18">
                        Email address
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        name="password"
                        id="form2Example28"
                        value={loginInfo.password}
                        onChange={handleInfo}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="form2Example28">
                        Password
                      </label>
                    </div>

                    <div className="pt-1 mb-4">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>

                    <p className="small mb-5 pb-lg-2">
                      <Link className="text-muted" to='/forgotpassword'>
                        Forgot password?
                      </Link>
                    </p>
                    <p>
                      Don't have an account?{" "}
                      <Link to="/register" className="link-info">
                        Register here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
              <div className="col-sm-6 px-0 d-none d-sm-block">
                <img
                  src="https://source.unsplash.com/random/?movies"
                  alt="/"
                  className="w-100 vh-100"
                  style={{ objectFit: "fill", objectPosition: "left" }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
