import axios from "axios";
import React, { useState } from "react";
import "../styles/Reg.css";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../config";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Update the specific field in the state
    }));
  };

  const navigate = useNavigate();
  const [invalidCreds, setInvalidCreds] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post(API_URL+"/register", formData)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          localStorage.setItem("jwt", response.data.token);
          setInvalidCreds(false)
          navigate("/")
        }else{
          console.log(response.data)
          setInvalidCreds(true)
        }
      })
      .catch((response) => {
        console.log(response.data)
        setInvalidCreds(true);
      });
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

  return (
    <div className="reg">
      <label className="display-1">Sign Up</label>
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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
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
        <h6 className="text-danger lh-sm text-break">
          <br />
          {invalidCreds ? "This Email or Username is already used" : ""}
        </h6>

        <div id="linkb">
          <button className="btn btn-outline-primary " type="submit">
            Sign Up
          </button>
          <Link to="/login" className="btn btn-outline-secondary">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
