
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

interface props {
  cardData: {
    front?: string;
    back?: string;
    id?: bigint;
  };
}

export default function ChangeButton({ cardData }: props) {
  const [switched, setSwitched] = useState(false);

  return (
    <Link
      to={switched?`/learn?cardId=${cardData.id}`:"/learn"}
      type="button"
      onClick={()=>{setSwitched(!switched)}}
      className="btn btn-outline-info"
    >
      <FaEdit size={20} color="#0dcaf0"></FaEdit>
    </Link>
  );
}
