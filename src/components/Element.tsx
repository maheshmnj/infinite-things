// Element.tsx
import React from "react";
import { ElementData } from "../Types";
interface ElementProps {
  element: ElementData;
  onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
}

function Element({ onDrag, element }: ElementProps) {
  return (
    <div
      className={`element p-4 min-w-4 text-white text-center font-bold rounded-2xl shadow-lg cursor-pointer`}
      onDrag={onDrag}
      onDragStart={(e) => {
        e.dataTransfer.setData("string", JSON.stringify(element));
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
