import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { API_URL } from "../config";
import { getHeaders } from "../config";

interface props {
  id?: bigint;
  update: any;
}

export default function DeleteBtn({ id, update }: props) {
  const onDelete = () => {
    axios.delete(API_URL + "/cards/" + id, { headers: getHeaders() });

    update();
  };

  return (
    <button
      onClick={onDelete}
      type="button"
      className="border bg-[#0D1321] border-white text-white hover:bg-gray-400 hover:text-white py-2 px-4 rounded"
    >
      <div>
        <FaTrash size={20} color="white"></FaTrash>
      </div>
    </button>
  );
}
