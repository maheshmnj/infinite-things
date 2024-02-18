// App.tsx
import React, { useState } from "react";
import GameBoard from "../src/components/GameBoard/GameBoard";
import SideBar from "../src/components/SideBar/SideBar";
import { ElementData } from "./Types";
function App() {
  const [draggedElement, setDraggedElement] = useState<ElementData | null>(null);

  const updateDraggedElement = (element: ElementData | null) => {
    setDraggedElement(element);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="md:w-1/5 bg-fuchsia-50 p-4">
        <h1 className="text-xl font-bold mb-4">Infinite Things ♾️</h1>
        <SideBar setDraggedElement={setDraggedElement} />
      </div>
      <div className="md:w-4/5 bg-amber-50 flex-grow">
        <GameBoard draggedElement={draggedElement} updateDraggedElement={updateDraggedElement} />
      </div>
    </div>
  );
}

export default App;
