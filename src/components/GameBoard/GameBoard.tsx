import React, { useState } from "react";
import Element from "../Element";
import { ElementData } from "../../Types";

interface GameBoardProps {
  draggedElement: ElementData | null;
}

const GameBoard: React.FC<GameBoardProps> = ({ draggedElement }) => {
  const [elements, setElements] = useState<ElementData[]>([
    { id: "Water", dx: 0, dy: 0, color: "#3498db" },
    { id: "Fire", dx: 0, dy: 0, color: "#e74c3c" },
    { id: "Wind", dx: 0, dy: 0, color: "#2ecc71" },
  ]);

  const [draggingElement, setDraggingElement] = useState<ElementData | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.border = "none";

    if (draggedElement) {
      // Check if the dropped element is from the sidebar or internal drag
      const isExternalDrop = !draggingElement;  // Corrected this line

      if (isExternalDrop) {
        // External drop: add the dragged element from the sidebar
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newElement = { ...draggedElement, dx: x, dy: y };
        setElements((prevElements) => [...prevElements, newElement]);
      } else {
        // Internal drop: update the position of the dragged element
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const updatedElement = { ...draggingElement, dx: x, dy: y };

        setElements((prevElements) =>
          prevElements.map((el) => (el.id === draggingElement.id ? updatedElement : el))
        );
      }
    }

    // Reset the dragging element in the state
    setDraggingElement(null);
  };


  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    element: ElementData
  ) => {
    console.log("drag start", element.id);
    // Set the dragged element in the state
    setDraggingElement(element);

    // Set data to be transferred during the drag
    e.dataTransfer.setData("elementId", element.id.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Check if there's a dragging element
    if (draggingElement) {
      // Calculate new position based on cursor location
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update dx and dy in draggingElement (or state)
      setDraggingElement((prevElement) => {
        if (prevElement) {
          return { ...prevElement, dx: x, dy: y };
        }
        return prevElement;
      });
    }
  };


  const handleDragEnd = () => {
    // Reset the dragging element in the state
    setDraggingElement(null);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.border = "2px dashed #333";

    // Get the elementId from dataTransfer only if draggingElement is null
    if (!draggingElement && draggedElement) {
      console.log("drag enter", draggedElement?.id);
      setDraggingElement(draggedElement);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.border = "none";
  };

  return (
    <div
      className="game-board bg-gray-200 relative h-full p-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
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
