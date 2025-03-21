import { useState } from "react";
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
    <div
      className="mcontainer"
      style={{
        width: "clamp(250px, 90vw, 600px)",
        height: "clamp(330px, 70vh, 680px)",
        background: "#e5e7eb",
        borderRadius: "12px",
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        zIndex: 1,
      }}
    >
      <div id="card">
        <div className="content">
          <form onSubmit={submit} className="flex flex-col">
            <div className="mb-3">
              <label className="block mb-2">Front side</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-800 rounded-md"
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
                className="w-full px-3 py-2 border border-gray-800 rounded-md"
                id="backinput"
              />
            </div>
            <span className="text-cyan-400"></span>
            <br />
            <button
              type="submit"
              className="bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white py-2 px-4 rounded flex-grow"
            >
              Change
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
