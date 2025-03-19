import axios from "axios";
import { useState } from "react";
import "../styles/Create.css";
import { API_URL } from "../config";
import { getHeaders } from "../config";
export default function Create() {
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Update the specific field in the state
    }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.back !== "" || formData.front !== "") {
      axios
        .post(API_URL + "/cards", formData, { headers: getHeaders() })
        .then((response) => {
          if (response.status === 200) {
            setStatus("Successfully Created");
          }
          //console.log(response.data);//to delete
        });
      setFormData({ front: "", back: "" });
    } else {
      setStatus("Write Something");
    }
  };

  return (
    <div id="glav" className="p-4 border rounded flex flex-col">
    <form onSubmit={submit} className="flex flex-col">
      <div className="mb-3">
        <label className="block mb-2">Front side</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          onChange={handleChange}
          value={formData.front}
          name="front"
          id="frontinput"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-2">Back side</label>
        <input
          type="text"
          name="back"
          onChange={handleChange}
          value={formData.back}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          id="backinput"
        />
      </div>
      <span className="text-cyan-400">{status}</span>
      <br />
      <button type="submit" className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded flex-grow">
        Create
      </button>
    </form>
  </div>
  );
}
