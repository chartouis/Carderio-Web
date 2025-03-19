import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

export default function LoginForm() {
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
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
    <label className="text-6xl mb-8">Log In</label>
    <form className="p-6 border rounded border-gray-300 w-full max-w-md" onSubmit={submit}>
      <div className="mb-4">
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          onKeyDown={handleKeyDown}
        />
      </div>
      <h6 className="text-red-500 break-words leading-tight mb-4">
        {invalidCreds ? "Invalid Credentials" : ""}
      </h6>
      <div className="flex justify-between">
        <button className="bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white py-2 px-4 rounded" type="submit">
          Log in
        </button>
        <Link to="/signup" className="bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white py-2 px-4 rounded">
          Sign Up
        </Link>
      </div>
    </form>
  </div>
  );
}

