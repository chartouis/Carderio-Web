import axios from "axios";
import React, { useState } from "react";
import "../styles/Reg.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../config";

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Update the specific field in the state
    }));
  };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const form = e.currentTarget.form;
        if (!form) return;
        const elements = Array.from(form.elements) as HTMLElement[];
        const index = elements.indexOf(e.currentTarget as HTMLElement);
        if (index > -1 && index < elements.length - 1) {
          elements[index + 1].focus();
        }
      }
    };

  const [invalidCreds, setInvalidCreds] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post(API_URL+"/login", formData)
      .then((response) => {
        if (response.data) {
          localStorage.setItem("jwt", response.data.token);
          setInvalidCreds(false);
        } else {
          setInvalidCreds(true);
        }
        navigate("/");
      })
      .catch(() => {
        setInvalidCreds(true);
      });
  };

  return (
    <div className="reg">
      <label className="display-1">Log In</label>
      <br />
      <br />
      <form className="p-4 border rounded" onSubmit={submit}>
        <div>
          <input
            className="form-control"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            onKeyDown={handleKeyDown}
          />
        </div>
        <br />
        <div>
          <input
            className="form-control"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            onKeyDown={handleKeyDown}
          />
        </div>
        <h6 className="text-danger text-break lh-sm">
          <br />
          {invalidCreds ? "Invalid Credentials" : ""}
        </h6>
        <div id="linkb">
          <button className="btn btn-outline-primary " type="submit">
            Log in
          </button>
          <Link to="/signup" className="btn btn-outline-secondary">
            {" "}
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
