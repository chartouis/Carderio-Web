import { useState } from "react";
import "../styles/Edit.css";
import axios from "axios";
import { API_URL, getHeaders } from "../config";
import { useNavigate } from "react-router-dom";

interface CardProps {
  front?: string;
  back?: string;
  id?: bigint;
}

export default function FlashcardEdit({ front, back, id }: CardProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: id,
    front: front,
    back: back,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios
      .patch(API_URL + "/cards", formData, { headers: getHeaders() })
      .then(() => {
        //console.log(response.data); //todelete
      })
      .finally(() => {
        navigate("/learn", { replace: true });
      });
  };

  return (
    <div className="mcontainer">
      <div id="card">
        <div className="content">
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
            <span className="text-info"></span>
            <br />
            <button type="submit" className="btn btn-outline-primary flex-fill">
              Change
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
