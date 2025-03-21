import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export default function RegisterForm() {
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
          navigate("/login")
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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#0D1321] text-cyan-400">
    <label className="text-6xl mb-8">Sign Up</label>
    <form className="p-6 border rounded border-gray-300 w-full max-w-md" onSubmit={submit}>
      <div className="mb-4">
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-cyan-400"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="mb-4">
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-cyan-400"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="mb-4">
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-cyan-400"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          onKeyDown={handleKeyDown}
        />
      </div>
      <h6 className="text-red-500 leading-tight break-words mb-4">
        {invalidCreds ? "This Email or Username is already used" : ""}
      </h6>
      <div className="flex justify-between">
        <button className="bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white py-2 px-4 rounded" type="submit">
          Sign Up
        </button>
        <Link to="/login" className="bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white py-2 px-4 rounded">
          Login
        </Link>
      </div>
    </form>
  </div>
  );
}


