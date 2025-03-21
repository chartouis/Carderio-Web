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
    <div className="border border-white text-white hover:bg-gray-400 hover:text-white py-2 px-4 rounded">
      <Link
        to={switched ? `/learn?cardId=${cardData.id}` : "/learn"}
        type="button"
        onClick={() => {
          setSwitched(!switched);
        }}
      >
        <FaEdit size={20} color="white"></FaEdit>
      </Link>
    </div>
  );
}
