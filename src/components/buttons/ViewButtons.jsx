import React, { useState } from "react";

const ViewButtons = ({ orbitControlsRef, toggleRotate }) => {
  const [activeView, setActiveView] = useState("optionDefault");
  const [isRotating, setIsRotating] = useState(false);

  const setView = (position, target = [0, 0, 0], viewId) => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.object.position.set(...position);
      orbitControlsRef.current.target.set(...target);
      orbitControlsRef.current.update();
    }
    setActiveView(viewId);
  };

  const handleToggleRotate = () => {
    setIsRotating((prev) => !prev);
    toggleRotate();
  };

  return (
    <div className="absolute z-30 p-1">
      <div className="flex flex-wrap justify-center gap-2">
        {/* Main 360 Toggle Button */}
        <label
          className={`cursor-pointer px-3 py-1 rounded text-sm flex items-center gap-1 transition
            ${isRotating ? "bg-gray-800 text-white" : "bg-white text-gray-800 hover:bg-gray-100"}`}
          title={isRotating ? "Exit 360 View" : "Toggle Rotate 360"}
        >
          <input
            type="checkbox"
            className="hidden"
            onClick={handleToggleRotate}
          />
          <i className="bi bi-arrow-repeat"></i>
          {isRotating ? "Exit 360°" : "View 360°"}
        </label>

        {/* Uncomment & convert other view buttons as needed */}
        {/* {[
          { id: "option1", label: "Front", icon: "bi-arrow-up", position: [0, 0, 6] },
          { id: "optionBack", label: "Back", icon: "bi-arrow-down", position: [0, 0, -6] },
          { id: "optionLeft", label: "Left", icon: "bi-arrow-left", position: [5, 0, 0] },
          { id: "optionRight", label: "Right", icon: "bi-arrow-right", position: [-5, 0, 0] },
          { id: "optionTop", label: "Top", icon: "bi-chevron-up", position: [0, 8, 0] },
          { id: "optionDefault", label: "Default", icon: "bi-house-fill", position: [-4, 3, -4.8] }
        ].map(({ id, label, icon, position }) => (
          <label
            key={id}
            className={`cursor-pointer px-3 py-1 rounded text-sm flex items-center gap-1 transition ${
              activeView === id ? "bg-gray-800 text-white" : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
            title={`Switch to ${label} View`}
          >
            <input
              type="radio"
              name="options"
              className="hidden"
              onClick={() => setView(position, [0, 0, 0], id)}
            />
            <i className={`bi ${icon}`}></i>
            {label}
          </label>
        ))} */}
      </div>
    </div>
  );
};

export default ViewButtons;
