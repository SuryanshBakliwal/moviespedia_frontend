import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../../service/api";

export default function ResetPassword() {
  const { id } = useParams();
  const [validUrl, setValidUrl] = useState(false);
  const [msg, setMsg] = useState("");

  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setLoading] = useState(true);

  const handleCredentails = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reset = async () => {
      try {
        // const url = `http://localhost:8000/${id}/verify/${token}`;
        let data = await resetPassword(id, credentials);
        console.log(data);

        if (data.data.message) {
          setValidUrl(true);
          setMsg(data.data.message);
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setValidUrl(false);
      }
      setLoading(false);
    };
    reset();
  };

  return (
    <div>
      <div
        className="d-flex text-center mt-3 flex-column justify-content-center align-items-center"
        style={{ width: "100%" }}
      >
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={handleCredentails}
              placeholder="Password"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              class="form-control"
              id="exampleInputPassword1"
              value={credentials.confirmPassword}
              onChange={handleCredentails}
              placeholder="Confirm Password"
            />
          </div>
          {msg && <div className="text-success">{msg}</div>}
          <button type="submit" class="btn btn-primary">
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
}
