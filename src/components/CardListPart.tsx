import axios from "axios";
import { API_URL, getHeaders } from "../config";

interface props {
  front?: string;
  back?: string;
}

export default function CardListPart({ front, back }: props) {
  const create = () => {
    axios
      .post(
        API_URL + "/cards",
        { front: front, back: back },
        { headers: getHeaders() }
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div className="flex flex-col border border-gray-700 rounded text-balance text-white justify-between overflow-hidden gap-0">
      <div className="hover:bg-green-400 relative group" onClick={create}>
        {/* <span className="absolute left-10 -translate-x-1/2 top-1/2 mt-2 w-max bg-black text-white text-sm p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
          Save
        </span> */}
        <span className="">Front : {front}</span>
      </div>
      <div className="hover:bg-red-400 relative group">
        {/* <span className="absolute left-10 -translate-x-1/2 bottom-1/2 mt-2 w-max bg-black text-white text-sm p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
          Delete
        </span> */}
        <span className="">Back : {back}</span>
      </div>
    </div>
  );
}
