// SideBar.tsx
import React from 'react';

const SideBar: React.FC = () => {
  const elements = ['Water', 'Fire', 'Wind'];

  const handleDragStart = (e: React.DragEvent, element: string) => {
    e.dataTransfer.setData('element', element);
  };

  return (
    <div className="side-bar">
      <h2>Side Bar</h2>
      <div>
        {elements.map((element, index) => (
          <div
            key={index}
            className="sidebar-element"
            draggable
            onDragStart={(e) => handleDragStart(e, element)}
          >
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
