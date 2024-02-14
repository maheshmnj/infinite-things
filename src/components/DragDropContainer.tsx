// DragDropContainer.tsx
import React, { useState, DragEvent } from "react";

interface DragDropContainerProps {
  onDrop: (id: string, x: number, y: number) => void;
  children: React.ReactNode;
}

const DragDropContainer: React.FC<DragDropContainerProps> = ({
  onDrop,
  children,
}) => {
  const [draggedElement, setDraggedElement] = useState<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedElement({
      id,
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    });
  };

  const handleDragEnd = () => {
    setDraggedElement(null);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (draggedElement) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - draggedElement.offsetX;
      const y = e.clientY - rect.top - draggedElement.offsetY;

      onDrop(draggedElement.id, x, y);
    }
  };

  return (
    <div
      className="drag-drop-container relative"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {draggedElement && (
        <div
          className="feedback"
          style={{
            left: draggedElement.offsetX,
            top: draggedElement.offsetY,
          }}
        >
          {draggedElement.id}
        </div>
      )}
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<any>, {
          onDragStart: handleDragStart,
          onDragEnd: handleDragEnd,
        })
      )}
    </div>
  );
};

export default DragDropContainer;
