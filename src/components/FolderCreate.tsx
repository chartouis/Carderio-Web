import axios from "axios";
import { useState } from "react";
import { API_URL, getHeaders } from "../config";

export default function FolderCreate() {
  const [formData, setFormData] = useState({
    name: "",
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

    if (formData.name !== "" && formData.name) {
      axios
        .post(API_URL + "/folders", formData, { headers: getHeaders() })
        .then((response) => {
          if (response.status === 200) {
            setStatus("Successfully Created");
          }
          //console.log(response.data);//to delete
        });
      setFormData({name:""});
    } else {
      setStatus("Write Something");
    }
  };

  return (
    <div className="p-4 top-1.5 border rounded border-white flex flex-col max-w-screen mx-auto gap-1">
      <form onSubmit={submit} className="flex flex-col">
        <div className="mb-3">
          <label className="block mb-2 text-white">Folder name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-white text-white rounded-md"
            onChange={handleChange}
            value={formData.name}
            name="name"
            id="frontinput"
            onKeyDown={handleKeyDown}
            maxLength={20}
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
    </div>
  );
}
