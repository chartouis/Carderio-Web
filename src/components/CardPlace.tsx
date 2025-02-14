import axios from "axios";
import { useEffect } from "react";
import "../styles/Card.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Flashcard from "./Flashcard";
import { DndContext } from "@dnd-kit/core";
import { DroppableArea } from "./Droppable";
import DeleteBtn from "./DeleteButton";
import { API_URL } from "../config";
import UseDisableScroll from "../hooks/UseDisableScroll"

function Card() {
  UseDisableScroll()
  const navigate = useNavigate();
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
    "Content-Type": "application/json",
  };

  const showCard = async () => {
    const timestamp = new Date().toISOString();
    const localDateTime = {
      localDateTime: timestamp,
    };

    await axios
      .post(API_URL + "/cards/request", localDateTime, { headers })
      .then((res) => {
        if (res.data !== "") {
          setCardData(res.data);
        } else {
          navigate("/");
        }
      })

      .catch((error) => {
        if (error.response?.status === 401) {
          console.error;
          navigate("/login"); // Redirect on 401
        }
      }).finally(()=>{setRP(false);});
    
  };

  const [cardData, setCardData] = useState<{
    front?: string;
    back?: string;
    id?: BigInteger;
  }>({});

  useEffect(() => {
    showCard();
  }, []);

  const remember = () => {
    newCard(true);
  };

  const forgot = () => {
    newCard(false);
  };

  const [requestPending, setRP] = useState(false);

  const newCard = async (isCorrect: boolean) => {
    console.log(requestPending);
    if (!requestPending) {
      setRP(true);
      const timestamp = new Date().toISOString();
      const check = {
        isCorrect,
        cardId: cardData.id,
        localDateTime: timestamp,
      };

      await axios
        .patch(API_URL + "/cards/request", check, {
          headers,
        })
        .then((res) => {
          if (res.status === 200) {
            showCard();
          } else {
            console.error("Request failed with status:", res.status);
            setRP(false);
          }
        })
        .catch((error) => {
          console.error("Request error:", error);
          setRP(false);
        });
    }
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
              <Flashcard
                front={cardData.front}
                back={cardData.back}
              ></Flashcard>
            </div>
            <div className="col mt-2">
              <DroppableArea id="correct" text="I Remember"></DroppableArea>
            </div>
          </div>
        </DndContext>
      </div>
      <br />
      <div className="d-flex justify-content-center" onClick={showCard}>
        <DeleteBtn
          id={cardData.id}
          headers={headers}
          update={showCard}
        ></DeleteBtn>
      </div>
    </div>
  );
}

export default Card;
