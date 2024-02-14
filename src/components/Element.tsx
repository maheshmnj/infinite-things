// Element.tsx
import React from "react";

interface ElementProps {
  id: string;
  onDragStart: (e: React.DragEvent, id: string) => void;
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateRandomPalette = () => {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  return [color1, color2];
};

const Element: React.FC<ElementProps> = ({ id, onDragStart }) => {
  const [color1, color2] = generateRandomPalette();

  return (
    <div
      className={`element p-4 min-w-12 text-white text-center font-bold rounded-2xl shadow-lg cursor-pointer`}
      style={{
        background: `linear-gradient(to bottom right, ${color1}, ${color2})`,
      }}
      draggable
      onDragStart={(e) => onDragStart(e, id)}
    >
      {id}
    </div>
  );
};

export default Element;
