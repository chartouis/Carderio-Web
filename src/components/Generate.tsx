import axios from "axios";
import { API_URL, getHeaders } from "../config";
import { useState } from "react";
import CardListPart from "./CardListPart";

export default function Generate() {
  const [prompt, setPrompt] = useState({
    context: "",
  });

  const [cards, setCards] = useState<
    Array<{ front?: string; back?: string; id?: bigint }>
  >([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPrompt((prev) => ({
      ...prev,
      [name]: value, // Update the specific field in the state
    }));
  };

  const onGenerate = () => {
    axios
      .post(API_URL + "/cards/m/ai", prompt, { headers: getHeaders() })
      .then((response) => {
        console.log("Response data:", response.data);
        if (response.data) {
          const newCards = response.data.map(
            (item: { id: any }, index: number) => ({
              ...item,
              id: item.id ?? BigInt(index + 1),
            })
          );
          setCards(newCards);
          setPrompt({ context: "" });
        }
      })
      .catch((error) => {
        console.error("Error generating cards:", error);
        // Optionally, add more error handling here, like showing a user message
      });
  };

  //   useEffect(() => {
  //     setCards(addID)
  //     console.log(cards);
  //   }, []);

  const handleDelete = (itemToDelete?: bigint) => {
    console.log(itemToDelete);
    console.log(cards);

    setCards(cards.filter((card) => card.id !== itemToDelete));
  };

  return (
    <div className="flex flex-col min-h-screen text-white justify-center items-center gap-7 p-10 pb-48 overflow-hidden">
      <div className="w-[80vw] border-b border-t border-b-white rounded flex-grow max-h-[70vh] overflow-auto gap-5">
        {cards?.map((card) => (
          <div
            className="mt-2"
            key={card.id}
            onClick={() => handleDelete(card.id)}
          >
            <CardListPart front={card.front} back={card.back} />
          </div>
        ))}
      </div>

      <div className="border border-white ">
        <textarea
          className="absolute left-[10vw] bottom-4 bg-[#0D1321] w-[80vw] max-h-40 border border-white rounded z-10 field-sizing-content"
          onChange={handleChange}
          value={prompt.context}
          name="context"
          maxLength={2000}
        />

        <button
          className="absolute bottom-3 right-[9vw] z-10 "
          onClick={onGenerate}
        >
          <div className="border border-white rounded hover:bg-gray-500 min-w-10 min-h-10 bg-[#0D1321]"></div>
        </button>
      </div>
    </div>
  );
}
