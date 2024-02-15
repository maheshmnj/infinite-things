import React, { useState } from "react";
import Element from "../Element";
import { ElementData } from "../../Types";

const GameBoard = () => {
  const [elements, setElements] = useState<ElementData[]>([
    { id: "Water", dx: 0, dy: 0, color: "#3498db" },
    { id: "Fire", dx: 0, dy: 0, color: "#e74c3c" },
    { id: "Wind", dx: 0, dy: 0, color: "#2ecc71" },
  ]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const elementId = e.dataTransfer.getData("elementId");
    const element = elements.find((el) => el.id.toString() === elementId);
    if (element) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      element.dx = x;
      element.dy = y;
      setElements([...elements]);
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    element: ElementData
  ) => {
    element.dx = e.clientX;
    element.dy = e.clientY;
    e.dataTransfer.setData("element", JSON.stringify({ element }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="game-board bg-gray-200 relative h-full p-4"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <h2 className="text-xl font-bold mb-4">Game Board</h2>
      <div className="min-w-0 relative">
        {elements.map((element) => (
          <Element
            key={element.id}
            element={element}
            onDrag={(e) => handleDragStart(e, element)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
