import React, { useState } from "react";
import Element from "../Element";
import { ElementData } from "../../Types";

interface PlaygroundProps {
  draggedElement: ElementData | null;
  updateDraggedElement: (element: ElementData | null) => void;
  className?: string;
}

const Playground: React.FC<PlaygroundProps> = ({ className, draggedElement, updateDraggedElement }) => {
  const [elements, setElements] = useState<ElementData[]>([
    { id: "Water", value: "Water", dx: 0, dy: 0, color: "#3498db" },
    { id: "Fire", value: "Fire", dx: 0, dy: 0, color: "#e74c3c" },
    { id: "Wind", value: "Wind", dx: 0, dy: 0, color: "#2ecc71" },
  ]);

  const [isLocalDrag, setIsLocalDrag] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const inner = e.currentTarget.children[1] as HTMLElement;
    if (!isLocalDrag) {
      e.currentTarget.style.border = "none";
    }
    const i = elements.findIndex(el => el.id === draggedElement!.id);
    if (i === -1) {
      // new element has been dropped
      const newElement = {
        ...draggedElement!,
        // update the position of the new element to drop location
        dx: x - inner.offsetLeft - inner.offsetWidth / 2,
        dy: y - inner.offsetTop - inner.offsetHeight / 2,
      };
      setElements((prevElements) => [...prevElements, newElement]);
    } else {
      const domElement = inner.children[i] as HTMLElement;
      const updatedElement = {
        ...draggedElement!,
        dx: x - inner.offsetLeft - domElement.offsetLeft - domElement.offsetWidth / 2,
        dy: y - inner.offsetTop - domElement.offsetTop - domElement.offsetHeight / 2,
      };
      // setElements((prevElements) => [...prevElements, updatedElement]);
      setElements((prevElements) => prevElements.map((el) => (el.id === draggedElement!.id ? updatedElement : el)));
    }
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
    if (!isLocalDrag) {
      e.currentTarget.style.border = "none";
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    updateDraggedElement(draggedElement!);
    if (!isLocalDrag) {
      e.currentTarget.style.border = "2px dashed #333";
    }
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, element: ElementData) => {
    console.log("drag start local", element.id);
    setIsLocalDrag(true);
    updateDraggedElement(element);
    e.dataTransfer.setData("elementId", element.id.toString());
  };

  const handleDragEnd = () => {
    updateDraggedElement(null);
    setIsLocalDrag(false);
  };

  return (
    <div
      className={`${className}`}
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
    </div >
  );
};

export default Playground;
