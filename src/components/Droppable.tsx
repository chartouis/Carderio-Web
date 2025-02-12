import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableAreaProps {
  id: string;
  text?: string;
  children?: React.ReactNode;
}

export function DroppableArea({ id, text, children }: DroppableAreaProps) {
  // The hook sets up the element as a drop target.
  const { isOver, setNodeRef } = useDroppable({ id });

  // Change style when a draggable is over this droppable area.
  const style = {
    border: isOver ? "2px dashed #0dcaf0" : "",
    padding: "20px",
    backgroundColor: "#0D1321",
    minWidth: "400px",
    minHeight: "100%",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children || isOver ? (
        <div className='text-center text-info align-middle'>
          <span>{text}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
