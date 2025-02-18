import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { API_URL } from "../config";
import { getHeaders } from "../config";

interface props {
  id?: BigInteger;
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
    <button onClick={onDelete} type="button" className="btn btn-outline-info">
      <div>
        <FaTrash size={20} color="#0dcaf0"></FaTrash>
      </div>
    </button>
  );
}
