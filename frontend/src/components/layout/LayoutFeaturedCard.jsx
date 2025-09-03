import React, { useState } from "react";
import GIFVanLoader from "../gif-van-loader/GifVanLoader";

const FeatureCard = ({ matchedModels, isLoading }) => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (index) => {
    setActiveCard(activeCard === index ? null : index);
    if (matchedModels[index].onClick) {
      matchedModels[index].onClick();
    }
  };
      if(isLoading){
      return (
  <GIFVanLoader/>
);
  }
  return (
    <div className="space-y-4 bg-brand w-full py-4 rounded-md">
      {matchedModels?.map((model, index) => {
        const isActive = activeCard === index;

        return (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`cursor-pointer rounded-md border-2 transition-all duration-300 bg-white
              flex w-full
              flex-row md:flex-col   /* row on mobile, col on desktop */
              ${isActive
                ? "shadow-lg scale-[1.02]"
                : "border-brand hover:shadow-md"}
            `}
          >

            {/* Image */}
            <div
              className={`flex-shrink-0 overflow-hidden flex items-center justify-center
                ${isActive ? "bg-white" : "bg-white"}
                w-20 h-20 m-3
                md:w-full md:h-25 md:m-0 md:p-2
                transition-colors duration-300 ease-in-out
              `}
            >
              <img
                src={model.image}
                alt={model.label}
                className="max-w-full max-h-full object-contain
                           transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-3 overflow-hidden w-full">
              <h3
                className={`font-semibold mb-1 truncate font-heading
                  ${isActive ? "text-dark" : "text-dark"}
                  text-sm md:text-base md:text-center
                `}
              >
                {model.label}
              </h3>

              <p
                className={`text-xs md:text-sm flex-1 font-body tracking-tighter
                  ${isActive ? "text-dark" : "text-dark"}
                  line-clamp-2 md:line-clamp-2 md:text-center
                  break-words overflow-hidden
                `}
              >
                {model.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureCard;
