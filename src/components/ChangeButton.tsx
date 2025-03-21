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
    <div className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white py-2 px-4 rounded">
      <Link
        to={switched ? `/learn?cardId=${cardData.id}` : "/learn"}
        type="button"
        onClick={() => {
          setSwitched(!switched);
        }}
      >
        <FaEdit size={20} color="#0dcaf0"></FaEdit>
      </Link>
    </div>
  );
}
