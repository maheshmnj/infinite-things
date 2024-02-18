import React, { useState } from "react";
import Element from "../Element";
import { ElementData } from "../../Types";

interface GameBoardProps {
  draggedElement: ElementData | null;
  updateDraggedElement: (element: ElementData | null) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ draggedElement, updateDraggedElement }) => {
  const [elements, setElements] = useState<ElementData[]>([
    { id: "Water", dx: 0, dy: 0, color: "#3498db" },
    { id: "Fire", dx: 0, dy: 0, color: "#e74c3c" },
    { id: "Wind", dx: 0, dy: 0, color: "#2ecc71" },
  ]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // const isExternalDrop = !localDragElement;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // if (isExternalDrop) {
    //   console.log("external drop", draggedElement!.id);
    //   const newElement = { ...draggedElement!, dx: x, dy: y };
    //   setElements((prevElements) => [...prevElements, newElement]);
    // } else {
    const inner = e.currentTarget.children[1] as HTMLElement;
    const i = elements.findIndex(el => el.id === draggedElement!.id);
    const domElement = inner.children[i] as HTMLElement;

    const updatedElement = {
      ...draggedElement!,
      dx: x - inner.offsetLeft - domElement.offsetLeft - domElement.offsetWidth / 2,
      dy: y - inner.offsetTop - domElement.offsetTop - domElement.offsetHeight / 2,
    };
    // setElements((prevElements) => [...prevElements, updatedElement]);
    setElements((prevElements) => prevElements.map((el) => (el.id === draggedElement!.id ? updatedElement : el)));
    // }

    updateDraggedElement(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggedElement) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      updateDraggedElement({ ...draggedElement, dx: x, dy: y });
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // console.log("drag leave external:", externalDrag);
    // setExternalDragging(draggedElement != null);
    // e.currentTarget.style.border = externalDrag ? "2px dashed #333" : "none";
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // console.log("drag enter external:", externalDrag);
    updateDraggedElement(draggedElement!);
    // e.currentTarget.style.border = "2px dashed #333";
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, element: ElementData) => {
    console.log("drag start", element.id);
    updateDraggedElement(element);
    e.dataTransfer.setData("elementId", element.id.toString());
  };

  const handleDragEnd = () => {
    updateDraggedElement(null);
  };

  return (
    <div
      className="game-board bg-gray-200 relative h-full p-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDragEnd={handleDragEnd}
    >
      <h2 className="text-xl font-bold mb-4">Game Board</h2>
      <div className="min-w-0 absolute">
        {elements.map((element) => (
          <Element
            key={element.id}
            element={element}
            onDragStart={(e) => {
              e.dataTransfer.setData("elementId", element.id.toString());
              handleDragStart(e, element);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
