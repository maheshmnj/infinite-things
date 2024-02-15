// SideBar.tsx
import React from "react";
import Element from "../Element";
import { ElementData } from "../../Types";

const elements: ElementData[] = [
  { id: "Water", dx: 0, dy: 0, color: "#3498db" },
  { id: "Fire", dx: 0, dy: 0, color: "#e74c3c" },
  { id: "Wind", dx: 0, dy: 0, color: "#2ecc71" },
];
// Handle drag event
const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
  // console.log("dragging position:", e.clientX, e.clientY);
};

const SideBar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2 className="text-xl font-bold mb-4">Side Bar</h2>
      <div className="grid grid-cols-2 gap-4">
        {elements.map((element) => (
          // spread operator to pass the element properties as props
          <Element key={element.id} element={element} onDrag={handleDrag} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
