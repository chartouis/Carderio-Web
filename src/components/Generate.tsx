import axios from "axios";
import { API_URL, getHeaders } from "../config";
import { useEffect, useState } from "react";
import CardListPart from "./CardListPart";

export default function Generate() {
  const [prompt, setPrompt] = useState({
    context: "",
  });

  const [cards, setCards] = useState<
    Array<{ front?: string; back?: string; id?: bigint }>
  >([]);

  const [isGenerating, setGenerating] = useState(false);
  const [isNotEmpty, setEmpty] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPrompt((prev) => ({
      ...prev,
      [name]: value, // Update the specific field in the state
    }));
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      if (!event.clipboardData) return;
      const pastedText = event.clipboardData.getData("text");
      try {
        const parsed = JSON.parse(pastedText);
        setCards((prevCards) => {
          const every = prevCards.concat(parsed);
          return every.map((item, index) => ({
            ...item,
            id: item.id ?? BigInt(index + 1),
          }));
        });
        setEmpty(true);
      } catch (error) {
        console.log("");
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  const onGenerate = () => {
    setGenerating(true);
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
          setEmpty(true)
        }
      })
      .catch((error) => {
        console.error("Error generating cards:", error);
        // Optionally, add more error handling here, like showing a user message
      })
      .finally(() => {
        setGenerating(false);
      });
    setPrompt({ context: "" });
  };

  const saveAll = () => {
    setEmpty(false);
    if (cards.length === 0) {
      console.log("empty")
      return;
    }
    const toSend = cards.map(({ id, ...rest }) => rest);
    axios
      .post(API_URL + "/cards/m", toSend, { headers: getHeaders() })
      .then((response) => {
        console.log(response.data);
      });
    setCards([]);
  };

  //   useEffect(() => {
  //     setCards(addID)
  //     console.log(cards);
  //   }, []);

  const handleDelete = (itemToDelete?: bigint) => {
    console.log(itemToDelete);
    console.log(cards);
    if (cards.length === 1) {
      setEmpty(false);
    }

    setCards(cards.filter((card) => card.id !== itemToDelete));
  };

  return (
    <div className="flex flex-col min-h-screen text-white justify-center items-center gap-7 p-10 pb-48 overflow-hidden">
      {!isNotEmpty ? (
        ""
      ) : (
        <button
          onClick={saveAll}
          className="border self-start -mt-10 border-white rounded w-full md:w-40 h-10 md:h-15 md:ml-[7%] hover:bg-white hover:text-gray-800"
        >
          Save All
        </button>
      )}

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
      <h2 className="absolute top-1/2 bottom-1/2   text-3xl">
        {isGenerating ? "Generating..." : ""}
      </h2>
      <h2 className="absolute left-1/10 right-1/10 top-2/5 text-2xl lg:text-5xl">
        {!isGenerating && !isNotEmpty
          ? 'You can just ctrl+v here a json object list with cards. \n the structure is [{"back" : string, "front" : string}] . You can also generate cards by writing under'
          : ""}
      </h2>
    </div>
  );
}
