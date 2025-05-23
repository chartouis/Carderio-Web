import axios from "axios";
import { useState } from "react";
import { API_URL } from "../config";
import { getHeaders } from "../config";
import { FaFolder, FaMagic } from "react-icons/fa";
import { Link } from "react-router-dom";
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
    <div>
      <div className="p-4 top-1.5 border rounded border-white flex flex-col max-w-screen mx-auto gap-1">
        <form onSubmit={submit} className="flex flex-col">
          <div className="mb-3">
            <label className="block mb-2 text-white">Front side</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-white text-white rounded-md"
              onChange={handleChange}
              value={formData.front}
              name="front"
              id="frontinput"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-white">Back side</label>
            <input
              type="text"
              name="back"
              onChange={handleChange}
              value={formData.back}
              className="w-full px-3 py-2 border border-white text-white rounded-md"
              id="backinput"
              onKeyDown={handleKeyDown}
            />
          </div>
          <span className="text-white">{status}</span>
          <br />
          <button
            type="submit"
            className="bg-transparent border border-white text-white hover:bg-white hover:text-gray-800 py-2 px-4 rounded flex-grow"
          >
            Create
          </button>
        </form>
        <Link to="/create/generate" className="mt-3 flex flex-row gap-2 border border-white rounded w-full py-2 px-6 justify-center text-white hover:bg-white hover:text-gray-800">
          <div className="-ml-6">
            <FaMagic color="white" size={20}></FaMagic>
          </div>
          <br />
          <div className="">
            <h4 className="">Import</h4>
          </div>
        </Link>
        <Link to="/create/folders" className="mt-3 flex flex-row gap-2 border border-white rounded w-full py-2 px-6 justify-center text-white hover:bg-white hover:text-gray-800">
          <div className="-ml-6">
            <FaFolder color="white" size={20}></FaFolder>
          </div>
          <br />
          <div className="">
            <h4 className="">Folders</h4>
          </div>
        </Link>
      </div>
      
    </div>
  );
}
