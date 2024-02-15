// DragDropContainer.tsx
import React, { useState, DragEvent } from "react";
import { ElementData } from "../Types";

interface DragDropContainerProps {
  onDrop: (element: ElementData) => void;
  children: React.ReactNode;
}

const DragDropContainer: React.FC<DragDropContainerProps> = ({
  onDrop,
  children,
}) => {
  const [draggedElement, setDraggedElement] = useState<ElementData | null>(
    null
  );

  const handleDragStart = (e: React.DragEvent, element: ElementData) => {
    console.log("drag started");
    setDraggedElement({
      id: element.id,
      dx: e.clientX,
      dy: e.clientY,
      color: element.color,
    });
  };

  const handleDragEnd = () => {
    setDraggedElement(null);
    console.log("drag end");
  };

  const handleDragOver = (e: DragEvent) => {
    if (!draggedElement) {
      console.log("set element");
      const data = e.dataTransfer.getData("element");
      const element = JSON.parse(data);
      setDraggedElement(element);
    }
    console.log("dragging over");
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (draggedElement) {
      console.log("dropped");
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - draggedElement.dx;
      const y = e.clientY - rect.top - draggedElement.dy;
      const newElement: ElementData = {
        id: draggedElement.id,
        dx: x,
        dy: y,
        color: draggedElement.color, // Adjust based on your logic
      };

      onDrop(newElement);
    }
  };

  return (
    <div
      className="drag-drop-container relative min-h-screen"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {draggedElement && (
        <div
          className="feedback"
          style={{
            left: draggedElement.dx,
            top: draggedElement.dy,
          }}
        >
          {draggedElement.id}
        </div>
      )}
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<any>, {
          onDragStart: handleDragStart,
          onDragEnd: handleDragEnd,
          onDragOver: handleDragOver,
        })
      )}
    </div>
  );
};

export default DragDropContainer;
