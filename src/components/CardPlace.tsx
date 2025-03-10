import axios from "axios";
import { useEffect } from "react";
import "../styles/Card.css";
import { useState } from "react";
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

export default function Card() {
  UseDisableScroll();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [cardList, setCardList] =
    useState<Array<{ front?: string; back?: string; id: bigint }>>();

  const [cardData, setCardData] = useState<{
    front?: string;
    back?: string;
    id?: bigint;
  }>({ front: "", back: "" });
  const cardId = searchParams.get("cardId");

  const showCard = async () => {
    const timestamp = new Date().toISOString();
    const localDateTime = { localDateTime: timestamp };

    if (!cardList) {
      await axios
        .post(API_URL + "/cards/request", localDateTime, {
          headers: getHeaders(),
        })
        .then((res) => {
          if (res.data?.length > 0) {
            const sortedList = res.data.sort(() => Math.random() - 0.5);
            setCardList(sortedList);
            setCardData(sortedList[sortedList.length - 1]);
          } else {
            setCardList([]);
            setCardData({ front: "No cards", back: "Add some!" });
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            navigate("/login");
          }
        });
    } else if (cardList.length > 0) {
      const newCardList = [...cardList];
      const card = newCardList.pop();
      if (card) {
        setCardList(newCardList);
        setCardData(card);
      }
    } else {
      setCardData({ front: "No cards left", back: "All done!" });
    }
  };

  useEffect(() => {
    showCard();
  }, []);

  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    setIsChanging(!isChanging);
    // if (isChanging === false) {
    //   showCard();
    // }
    // console.log(cardId);
  }, [cardId]);

  const remember = () => {
    newCard(true);
  };

  const forgot = () => {
    newCard(false);
  };

  const newCard = async (isCorrect: boolean) => {
    const timestamp = new Date().toISOString();
    const check = {
      isCorrect,
      cardId: cardData.id,
      localDateTime: timestamp,
    };

    showCard();

    await axios
      .patch(API_URL + "/cards/request", check, {
        headers: getHeaders(),
      })
      .then((res) => {
        if (res.status === 200) {
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
    <div className="d-flex flex-column gap-2">
      <div className="d-flex mt-5">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="d-flex flex-row gap-5">
            <div className="col mt-2">
              <DroppableArea id="forgot" text="I Forgot"></DroppableArea>
            </div>
            <div className="col mt-2">
              {isChanging ? (
                <Flashcard
                  front={cardData.front}
                  back={cardData.back}
                ></Flashcard>
              ) : (
                <FlashcardEdit
                  front={cardData.front}
                  back={cardData.back}
                  id={cardData.id}
                ></FlashcardEdit>
              )}
            </div>
            <div className="col mt-2">
              <DroppableArea id="correct" text="I Remember"></DroppableArea>
            </div>
          </div>
        </DndContext>
      </div>
      <br />
      <div className="gap-4 d-flex justify-content-center">
        <div onClick={showCard}>
          <DeleteBtn id={cardData.id} update={showCard}></DeleteBtn>
        </div>
        <div>
          <ChangeButton cardData={cardData}></ChangeButton>
        </div>
      </div>
    </div>
  );
}
