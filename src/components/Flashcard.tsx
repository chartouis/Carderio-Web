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
    <div className="mcontainer">
      {/* Attach the setNodeRef to your card element and spread listeners/attributes */}
      
      <div
        id="card"
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        
      >
        <div className="content">
          <h1 className="display-4 text-light">
            {isFlipped ? front : back}
          </h1>
          <h3 className="display-6 fs-4 text-light">
            {isFlipped ? "" : description}
          </h3>
        </div>
      </div>
    </div>
  );
}
