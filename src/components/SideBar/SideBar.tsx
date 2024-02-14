// SideBar.tsx
import React from "react";
import Element from "../Element";
const SideBar: React.FC = () => {
  const elements = [
    { id: "Water", color: "#3498db" },
    { id: "Fire", color: "#e74c3c" },
    { id: "Wind", color: "#2ecc71" },
    // Add more elements as needed
  ];

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("element", id);
  };

  return (
    <div className="sidebar">
      <h2 className="text-xl font-bold mb-4">Side Bar</h2>
      <div className="grid grid-cols-2 gap-4">
        {elements.map((element) => (
          <Element
            key={element.id}
            id={element.id}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
