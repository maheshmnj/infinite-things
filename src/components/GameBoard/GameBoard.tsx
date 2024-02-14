// GameBoard.tsx
import React, { useState } from "react";
import Element from "../Element";
import DragDropContainer from "../DragDropContainer";

interface ElementData {
  id: string;
  x: number;
  y: number;
}

const GameBoard: React.FC = () => {
  const [elements, setElements] = useState<ElementData[]>([]);

  const handleDrop = (id: string, x: number, y: number) => {
    setElements((prevElements) => [...prevElements, { id, x, y }]);
  };

  return (
    <DragDropContainer onDrop={handleDrop}>
      <div className="game-board flex-grow relative">
        <h2 className="text-xl font-bold mb-4">Game Board</h2>
        {elements.map((element) => (
          <Element key={element.id} id={element.id} onDragStart={() => {}} />
        ))}
      </div>
    </DragDropContainer>
  );
};

export default GameBoard;
