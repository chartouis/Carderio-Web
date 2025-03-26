import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, getHeaders } from "../config";
import { FaTrash } from "react-icons/fa";

interface Folder {
  id: number;
  name: string;
  parentId: number;
}

interface ChangeMode {
  id: number;
  folderName: string;
  isOn: boolean;
}

export default function FolderCreate() {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [changeMode, setChangeMode] = useState<ChangeMode>({
    id: 0,
    isOn: false,
    folderName: "",
  });
  const [status, setStatus] = useState("");
  const [folders, setFolders] = useState<Folder[]>([]);
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
    if (!changeMode.isOn) {
      if (formData.name !== "" && formData.name) {
        setStatus("")
        axios
          .post(API_URL + "/folders", formData, { headers: getHeaders() })
          .then((response) => {
            
            if (response.status === 200) {
              setStatus("Successfully Created");
            }
            else if(response.status === 400) {
              setStatus("Folder Limit Reached")
            }
            //console.log(response.data);//to delete
          })
          .finally(() => {
            getFolders();
          });
        setFormData({ name: "" });
      } else {
        setStatus("Write Something");
      }
    } else {
      axios
        .patch(API_URL + "/folders/" + changeMode.id, formData, {
          headers: getHeaders(),
        })
        .finally(() => {
          getFolders();
        });
      setChangeMode({ id: 0, isOn: false, folderName: "" });
      setFormData({ name: "" });
    }
  };

  const getFolders = () => {
    axios.get(API_URL + "/folders", { headers: getHeaders() }).then((res) => {
      if (res.data) {
        setFolders(res.data);
      }
    });
  };

  const onDelete = (id: number) => {
    axios
      .delete(API_URL + "/folders/" + id, { headers: getHeaders() })
      .finally(() => {
        getFolders();
      });
  };

  useEffect(() => {
    getFolders();
  }, []);

  return (
    <div className="p-4 top-1.5 border rounded border-white flex flex-col max-w-screen mx-auto gap-1">
      <form onSubmit={submit} className="flex flex-col">
        <div className="mb-3">
          <label className="block mb-2 text-white">
            {changeMode.isOn ? "Enter new folder name" : "Folder name"}
          </label>
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
          className="select-none bg-transparent border border-white text-white hover:bg-white hover:text-gray-800 py-2 px-4 rounded flex-grow"
        >
          {changeMode.isOn ? "Change" : "Create"}
        </button>
      </form>
      <div className="mt-3">
        {folders.map((folder, index) => (
          <div className="flex justify-between">
            <div
              key={index}
              onClick={() => (
                setChangeMode({
                  id: folder.id,
                  isOn: true,
                  folderName: folder.name,
                }),
                setFormData({ name: folder.name })
              )}
              className="select-none border border-white rounded w-45 p-1 mb-3 hover:bg-white text-white  hover:text-gray-800 bg-[#0D1321]"
            >
              {folder.name}
            </div>
            <div
              onClick={() => onDelete(folder.id)}
              className="border border-white rounded ml-2 bg-[#0D1321] w-9 h-9 flex justify-center items-center hover:bg-white"
            >
              <div className="place-self-center">
                <FaTrash size={20} color="white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
