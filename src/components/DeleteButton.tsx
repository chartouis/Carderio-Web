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
    axios.delete(API_URL + "/cards/" + id, { headers: getHeaders() }).then((response) => {
      if (response.status === 200) {
        update();
      }
    });
  };

  return (
    <button onClick={onDelete} type="button" className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white py-2 px-4 rounded">
      <div>
        <FaTrash size={20} color="#0dcaf0"></FaTrash>
      </div>
    </button>
  );
}
