// App.tsx
import React from "react";
import GameBoard from "../src/components/GameBoard/GameBoard";
import SideBar from "../src/components/SideBar/SideBar";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="md:w-1/5 bg-gray-200 p-4">
        <h1 className="text-xl font-bold mb-4">Infinite Things ♾️</h1>
        <SideBar />
      </div>
      <div className="md:w-4/5 bg-gray-300 p-4 flex-grow">
        <GameBoard />
      </div>
    </div>
  );
};

export default App;
