// Element.tsx
import React from "react";
import { ElementData } from "../Types";
interface ElementProps {
  element: ElementData;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, element: ElementData) => void;
}

function Element({ onDragStart, element }: ElementProps) {
  return (
    <div
      className={`element p-4 min-w-4 text-white text-center font-bold rounded-2xl shadow-lg cursor-pointer`}
      onDragStart={(e) => {
        onDragStart(e, element);
      }}
      style={{
        background: `${element.color}`,
        transform: `translate(${element.dx}px, ${element.dy}px)`,
      }}
      draggable
    >
      {element.id}
    </div>
  );
}

export default Element;
