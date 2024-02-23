// Element.tsx
import React from "react";
import { ElementData } from "../Types";
interface ElementProps {
  element: ElementData;
  className?: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, element: ElementData) => void;
}

function Element({ onDragStart, element, className }: ElementProps) {
  return (
    <div
      className={`p-4 min-w-4 text-white text-center font-bold rounded-2xl shadow-lg cursor-pointer hover:scale-125${className}`}
      onDragStart={(e) => {
        onDragStart(e, element);
      }}
      style={{
        background: `${element.color}`,
        transform: `translate(${element.dx}px, ${element.dy}px)`,
        scale: 1.65,
      }}
      draggable
    >
      {element.value}
    </div>
  );
}

export default Element;
