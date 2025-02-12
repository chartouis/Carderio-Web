import axios from "axios";
import { FaTrash } from "react-icons/fa";

interface props {
  id?: BigInteger;
  headers: {
    Authorization: string;
    "Content-Type": string;
  };
  update: any;
}

export default function DeleteBtn({ id, headers, update }: props) {
  const onDelete = () => {
    axios
      .delete("http://localhost:8080/cards/" + id, { headers })
      .then((response) => {
        if (response.status === 200){
          update()
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
