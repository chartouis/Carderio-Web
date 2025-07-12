import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { getHeaders } from "../config";
import { FaFolder, FaMagic, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Folder {
  index: number;
  id: number;
  name: string;
  parentId: number | null;
}

export default function Create() {
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  const [status, setStatus] = useState("");
  const [currentFolder, setCurFolder] = useState<Folder>({
    index: 0,
    id: 0,
    name: "Folderless",
    parentId: null,
  });
  const [folders, setFolders] = useState<Folder[]>([]);

  const [checked, setChecked] = useState(false);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    console.log(e.target.checked ? "ON" : "OFF");
  };

  useEffect(() => {
    axios.get(API_URL + "/folders", { headers: getHeaders() }).then((res) => {
      if (res.data) {
        const withIndexes = res.data.map((item: Folder, index: number) => ({
          ...item,
          index: index + 1,
        }));
        setFolders(withIndexes);
      }
    });
  }, []);

  const nextFolder = () => {
    if (folders[currentFolder.index]) {
      setCurFolder(folders[currentFolder.index]);
    } else {
      setCurFolder({
        index: 0,
        id: 0,
        name: "Folderless",
        parentId: null,
      });
    }
  };

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

const createCard = async (data: typeof formData) => {
  try {
    const response = await axios.post(API_URL + "/cards", data, {
      headers: getHeaders(),
    });

    if (response.status === 200) {
      const cardId = response.data.id ?? 0;

      if (currentFolder.id !== 0) {
        await axios.post(
          `${API_URL}/folders/${currentFolder.id}/cards/${cardId}`,
          null,
          { headers: getHeaders() }
        );
      }

      setStatus("Successfully Created");
    }
  } catch (err) {
    console.error(err);
    setStatus("Error while creating card");
  }
};

const submit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.front !== "" || formData.back !== "") {
    await createCard(formData);

    if (checked) {
      const swapped = {
        front: formData.back,
        back: formData.front,
      };
      await createCard(swapped);
    }

    setFormData({ front: "", back: "" });
  } else {
    setStatus("Write Something");
  }
};


  return (
    <div>
      <div className="p-4 top-1.5 border rounded border-white flex flex-col w-70 max-w-screen mx-auto gap-1">
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
          <div className="select-none flex mt-3 flex-row justify-between align-baseline gap-4 ">
            <button
              type="submit"
              className="bg-transparent border border-white text-white hover:bg-white hover:text-gray-800 py-2 px-4 rounded flex-grow"
            >
              Create
            </button>
            <label className="switch w-7 relative group">
              <input
                type="checkbox"
                onChange={handleCheckbox}
                checked={checked}
                className="w-full h-full text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              ></input>
              <span className="absolute left-0 mt-2 hidden group-hover:block bg-gray-700 text-white text-sm px-2 py-1 rounded">
                Create two cards for both sides
              </span>
            </label>
          </div>
        </form>
        <Link
          to="/create/generate"
          className="mt-3 flex flex-row gap-2 border border-white rounded w-full py-2 px-6 justify-center text-white hover:bg-white hover:text-gray-800"
        >
          <div className="-ml-6">
            <FaMagic color="white" size={20}></FaMagic>
          </div>
          <br />
          <div className="">
            <h4 className="">Import</h4>
          </div>
        </Link>
        <div className="select-none flex mt-3 flex-row justify-between align-baseline gap-4 ">
          <div
            onClick={nextFolder}
            className="mt-1 flex flex-col align-middle border border-white rounded min-w-42 py-2 px-6 justify-center  text-white hover:bg-white hover:text-gray-800"
          >
            <button className="-ml-6 flex flex-row justify-between whitespace-nowrap overflow-hidden text-ellipsis">
              <h3 className="flex flex-col mx-3">{currentFolder.name}</h3>
              <div className="flex flex-col">
                <FaFolder color="white" size={20}></FaFolder>
              </div>
            </button>
          </div>
          <Link
            to="/create/folders"
            className="mt-1 flex flex-col justify-center align-middle border border-white rounded w-24  text-white hover:bg-white hover:text-gray-800"
          >
            <div className="flex justify-center align-middle">
              <FaPlus size={20} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
