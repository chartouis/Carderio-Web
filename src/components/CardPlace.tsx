import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Flashcard from "./Flashcard";
import { DndContext } from "@dnd-kit/core";
import { DroppableArea } from "./Droppable";
import DeleteBtn from "./DeleteButton";
import { API_URL } from "../config";
import UseDisableScroll from "../hooks/UseDisableScroll";
import { getHeaders } from "../config";
import ChangeButton from "./ChangeButton";
import FlashcardEdit from "./FlashcardEdit";
import FolderAccordeon from "./FolderAccordeon";

export default function Card() {
  UseDisableScroll();
  const [random, setRandom] = useState<boolean>(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [cardList, setCardList] =
    useState<Array<{ front?: string; back?: string; id: bigint }>>();
  const [cardData, setCardData] = useState<{
    front?: string;
    back?: string;
    id?: bigint;
    folderId?: number;
  }>({ front: "", back: "" });
  const cardId = searchParams.get("cardId");

  // Shuffle the cards randomly
  const shuffleCards = (
    cards: Array<{ front?: string; back?: string; id: bigint }>
  ) => {
    return cards.sort(() => Math.random() - 0.5);
  };

  // Display the next card from the list
  const displayNextCard = (
    list: Array<{ front?: string; back?: string; id: bigint }>
  ) => {
    const newCardList = [...list];
    const card = newCardList.pop();
    setRandom(Math.random() < 0.5);
    if (card) {
      setCardList(newCardList);
      setCardData(card);
    }
  };

  // Fetch cards from the API
  const fetchCards = async () => {
    const timestamp = new Date().toISOString();
    const localDateTime = { localDateTime: timestamp };

    axios
      .post(API_URL + "/cards/request", localDateTime, {
        headers: getHeaders(),
      })
      .then((res) => {
        if (res.data?.length > 0) {
          const sortedList = shuffleCards(res.data);
          setCardList(sortedList.slice(0, sortedList.length - 1));
          displayNextCard(sortedList);
        } else {
          setCardList([]);
          setCardData({ front: "No cards", back: "Add some!" });
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("Request error:", error);
        }
      });
  };

  // Main function to show the next card or fetch new ones
  const showCard = () => {
    setRandom(Math.random() < 0.5);
    if (!cardList) {
      fetchCards();
    } else if (cardList.length > 0) {
      displayNextCard(cardList);
    } else {
      setCardData({ front: "No cards left", back: "All done!" });
    }
  };

  const cardsFromFolder = (folderId: number) => {
    const timestamp = new Date().toISOString();
    const localDateTime = { localDateTime: timestamp };

    axios
      .post(API_URL + "/folders/" + folderId + "/cards", localDateTime, {
        headers: getHeaders(),
      })
      .then((res) => {
        if (res.data?.length > 0) {
          const sortedList = shuffleCards(res.data);
          setCardList(sortedList.slice(0, sortedList.length - 1));
          displayNextCard(sortedList);
        } else {
          setCardList([]);
          setCardData({ front: "No cards", back: "Add some!" });
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("Request error:", error);
        }
      });
  };

  useEffect(() => {
    showCard();
  }, []);

  const [isChanging, setIsChanging] = useState(false);
  const [justEntered, setJE] = useState(true);

  useEffect(() => {
    if (!justEntered) {
      setIsChanging(!isChanging);
      if (!isChanging) {
        fetchCards();
      }
    } else {
      setJE(false);
    }
  }, [cardId]);

  const remember = () => {
    newCard(true);
  };

  const forgot = () => {
    newCard(false);
  };

  const newCard = (isCorrect: boolean) => {
    const timestamp = new Date().toISOString();
    const check = {
      isCorrect,
      cardId: cardData.id,
      localDateTime: timestamp,
    };

    showCard();

    axios
      .patch(API_URL + "/cards/request", check, {
        headers: getHeaders(),
      })
      .then((res) => {
        if (res.status === 200) {
          // Handle success if needed
        } else {
          console.error("Request failed with status:", res.status);
        }
      })
      .catch((error) => {
        console.error("Request error:", error);
      });
  };

  function handleDragEnd(event: any) {
    if (event.over && event.over.id === "forgot") {
      forgot();
    }
    if (event.over && event.over.id === "correct") {
      remember();
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex mt-5 justify-center">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex flex-row gap-5 ">
            <div className="mt-2">
              <DroppableArea id="forgot" text="I Forgot" />
            </div>
            <div className="flex mt-2 ">
              {isChanging ? (
                <FlashcardEdit
                  front={cardData.front}
                  back={cardData.back}
                  id={cardData.id}
                />
              ) : (
                <Flashcard front={random?cardData.front:cardData.back} back={random?cardData.back:cardData.front} />
              )}
            </div>
            <div className="mt-2">
              <DroppableArea id="correct" text="I Remember" />
            </div>
          </div>
        </DndContext>
      </div>
      <br />

      <div className="absolute bottom-10 left-1/2 right-1/2 z-10">
        <div className="flex gap-4 justify-center">
          <div onClick={showCard}>
            <DeleteBtn id={cardData.id} update={showCard} />
          </div>
          <div>
            <ChangeButton cardData={cardData} />
          </div>
        </div>
      </div>
      <div className="absolute top-20 left-1/2 right-1/2 z-10">
        <div className="flex gap-4 justify-center">
          <FolderAccordeon
            displayNextCard={() => displayNextCard(cardList ? cardList : [])}
            currentCardId={cardData.id}
            currentCardFolderId={cardData.folderId}
            onElementClick={cardsFromFolder}
          />
        </div>
      </div>
    </div>
  );
}
