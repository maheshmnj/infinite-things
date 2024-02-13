// GameBoard.tsx
import React, { useState } from 'react';

const GameBoard: React.FC = () => {
  const [elements, setElements] = useState<{ id: string; x: number; y: number }[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const element = e.dataTransfer.getData('element');
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setElements((prevElements) => [...prevElements, { id: element, x, y }]);
  };

  const handleDrag = (e: React.DragEvent, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setElements((prevElements) =>
      prevElements.map((el) => (el.id === id ? { ...el, x, y } : el))
    );
  };

  return (
    <div className="game-board" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <h2>Game Board</h2>
      <div>
        {elements.map((element) => (
          <div
            key={element.id}
            className="board-element"
            style={{ left: element.x, top: element.y }}
            draggable
            onDrag={(e) => handleDrag(e, element.id)}
          >
            {element.id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
