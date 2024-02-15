// SideBar.tsx
import React from "react";
import Element from "../Element";
import { ElementData } from "../../Types";

interface SideBarProps {
  setDraggedElement: React.Dispatch<React.SetStateAction<ElementData | null>>;
}

const SideBar: React.FC<SideBarProps> = ({ setDraggedElement }) => {
  const elements: ElementData[] = [
    { id: "Water", dx: 0, dy: 0, color: "#3498db" },
    { id: "Fire", dx: 0, dy: 0, color: "#e74c3c" },
    { id: "Wind", dx: 0, dy: 0, color: "#2ecc71" },
  ];

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    element: ElementData
  ) => {
    console.log("drag start in Sidebar for", element.id);
    setDraggedElement(element);
  };

  return (
    <div className="sidebar">
      <h2 className="text-xl font-bold mb-4">Side Bar</h2>
      <div className="grid grid-cols-2 gap-4">
        {elements.map((element) => (
          <Element
            key={element.id}
            element={element}
            onDragStart={(e) => handleDragStart(e, element)}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
