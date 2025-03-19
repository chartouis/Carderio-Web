import { useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
  front?: string;
  back?: string;
  description?: string;
}

export default function Flashcard({ front, back, description }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Use the dnd-kit hook to make the card draggable.
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: "flashcard", // Change this if you have multiple cards
  });

  // Create a style object to apply the transform (and optionally adjust opacity).
  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.9 : 1,
    transition: "transform ease", 
  };

  useEffect(()=>{
    setIsFlipped(!isFlipped)
  },[isDragging])

  return (
    <div className="flex justify-center items-center relative">
    <div
      id="card"
      ref={setNodeRef}
      style={{
        ...style,
        width: "clamp(250px, 90vw, 600px)",
        height: "clamp(330px, 70vh, 680px)",
        background: "#3E5C76",
        borderRadius: "12px",
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        zIndex: 1
      }}
      {...listeners}
      {...attributes}
    >
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl text-white">
          {isFlipped ? front : back}
        </h1>
        <h3 className="text-lg text-white">
          {isFlipped ? "" : description}
        </h3>
      </div>
    </div>
  </div>
  );
}
