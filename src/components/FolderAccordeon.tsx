import { useEffect, useState } from "react";
import { API_URL, getHeaders } from "../config";
import axios from "axios";
import { FaCircle } from "react-icons/fa";

interface Folder {
  id: number;
  name: string;
  parentId: number;
}

interface props {
  onElementClick: (folderId: number) => void;
  currentCardFolderId?: number;
  currentCardId?: bigint;
  displayNextCard:()=>void;
}

export default function Accordion({ onElementClick, currentCardFolderId, currentCardId, displayNextCard }: props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    axios.get(API_URL + "/folders", { headers: getHeaders() }).then((res) => {
      if (res.data) {
        setFolders(res.data);
      }
    });
  }, []);

  const addCardintoFolder = (cardId?:bigint, folderId?:number) => {
    axios.post(API_URL+"/folders/"+folderId+"/cards/"+cardId, null,{headers:getHeaders()}).then(
      (res)=>{
          if (res.status==200){
            displayNextCard()
          }
      }
    )
  }

  return (
    <div className="">
      <div
        onClick={toggleAccordion}
        className="flex w-56 items-center border justify-center border-white rounded hover:bg-white text-white  hover:text-gray-800"
      >
        <span className="text-lg ">Folders</span>
      </div>

      {isExpanded && (
        <div className="mt-2   border-t border-white">
          {folders.map((folder, index) => (
            <div className="flex justify-between">
              <div
                key={index}
                className="border border-white rounded w-45 p-1 mb-3 hover:bg-white text-white  hover:text-gray-800 bg-[#0D1321]"
                onClick={() => onElementClick(folder.id)}
              >
                {folder.name}
                {}
              </div>
              <div onClick={()=>addCardintoFolder(currentCardId, folder.id)} className="border border-white rounded ml-2 bg-[#0D1321] w-9 h-9 flex justify-center items-center">
                <div className="place-self-center">
                  {currentCardFolderId===folder.id?<FaCircle size={20} color="white"/>:""}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
