import axios from "axios";
import { useState } from "react";
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
    <div className="p-4 top-1.5 border rounded border-cyan-400 flex flex-col max-w-screen mx-auto">
    <form onSubmit={submit} className="flex flex-col">
      <div className="mb-3">
        <label className="block mb-2 text-cyan-400">Front side</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-cyan-300 text-cyan-400 rounded-md"
          onChange={handleChange}
          value={formData.front}
          name="front"
          id="frontinput"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-2 text-cyan-400">Back side</label>
        <input
          type="text"
          name="back"
          onChange={handleChange}
          value={formData.back}
          className="w-full px-3 py-2 border border-cyan-300 text-cyan-400 rounded-md"
          id="backinput"
        />
      </div>
      <span className="text-cyan-400">{status}</span>
      <br />
      <button type="submit" className="bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-cyan-800 py-2 px-4 rounded flex-grow">
        Create
      </button>
    </form>
  </div>
  );
}
