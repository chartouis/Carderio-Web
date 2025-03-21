import axios from "axios";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { API_URL, getHeaders } from "../config";
import { useState } from "react";

export default function Generate() {
  const [prompt, setPrompt] = useState({
    context: "",
  });

  const [cards, setCards] = useState<
    Array<{ front?: string; back?: string; id?: bigint }>
  >([{ front: "", back: "" }]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrompt((prev) => ({
      ...prev,
      [name]: value, // Update the specific field in the state
    }));
  };

  const onGenerate = async () => {
    await axios
      .post(API_URL + "/cards/m/ai", prompt, { headers: getHeaders() })
      .then((response) => {
        setPrompt({context:""})
        console.log(response.data);
        if (response.status === 200) {
          setCards(response.data);
        }
      });
  };

  return (
    <div className="flex flex-col min-h-screen text-white justify-center items-center gap-7 p-10 pb-48">
      <div className="w-[80vw] border border-white rounded flex-grow">
        {cards?.map((card) => (
          <div>
            <span>{card.front}</span>
            <span> | {card.back}</span>
          </div>
        ))}
      </div>

      <div className="border border-white">
        <input
          className="absolute left-[10vw] bottom-4 w-[70vw] h-12 border border-white rounded bg-[#0D1321] z-10"
          onChange={handleChange}
          value={prompt.context}
          name="context"
        />
        <button className="absolute bottom-6 right-[10vw]" onClick={onGenerate}>
          <FaArrowAltCircleRight size={25}></FaArrowAltCircleRight>
        </button>
      </div>
    </div>
  );
}
