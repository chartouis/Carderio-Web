import axios from "axios";
import { useState } from "react";
import "../styles/Create.css"
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

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };

    if (formData.back !== "" || formData.front !== "") {
      axios
        .post("https://carderio-api.onrender.com/cards", formData, { headers })
        .then((response) => {
          if (response.status === 200) {
            setFormData({ front: "", back: "" });
            setStatus("Successfully Created");
          }
          console.log(response.data);
        });
    }else{
      setStatus("Write Something")
    }
  };

  

  return (
    <div id="glav" className="p-4 border rounded flex-column">
      <form onSubmit={submit} className="d-flex flex-column">
        <div className="mb-3">
          <label className="form-label">Front side</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={formData.front}
            name="front"
            id="frontinput"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Back side</label>
          <input
            type="text"
            name="back"
            onChange={handleChange}
            value={formData.back}
            className="form-control"
            id="backinput"
          />
        </div>
        <span className="text-info">
          {status}
        </span>
        <br />
        <button type="submit" className="btn btn-outline-primary flex-fill">
          Create
        </button>
      </form>
    </div>
  );
}
