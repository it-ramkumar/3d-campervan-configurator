// import { useRef,useState  } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectLayout } from "../../redux/slices/selectLayout";
import { setAddedModels } from "../../redux/slices/addedModels";
import data from "../../json data/newCard.json";
// import ColorButton from "../colorPanel/colorPanel";
;

const LandingPage = () => {
  const dispatch = useDispatch();
  // const buttonRef = useRef(null);
  // const [dragging, setDragging] = useState(false);
  // const [pos, setPos] = useState({ x: 0, y: 0 });

  // const handleMouseDown = (e) => {
  //   setDragging(true);
  //   e.preventDefault();
  // };

  // // const handleMouseMove = (e) => {
  // //   if (dragging) {
  // //     setPos((prev) => ({
  // //       x: prev.x + e.movementX,
  // //       y: prev.y + e.movementY,
  // //     }));
  // //   }
  // // };

  // // const handleMouseUp = () => {
  // //   setDragging(false);
  // // };

  return (
<div className="min-h-screen bg-brand ">
   {/* <div
      ref={buttonRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: "fixed",
        top: "50%",
        left: 0,
        transform: `translate(${pos.x}px, calc(-50% + ${pos.y}px))`,
        marginLeft: "8px",
        zIndex: 10,
        cursor: "grab",
      }}
    >
      <ColorButton />
    </div> */}
  <div className="flex flex-col items-center justify-center">
    <div className="w-full max-w-6xl mx-auto">
      <h3 className="text-center py-2 mb-2 text-2xl font-heading font-bold sm:text-2xl md:text-3xl uppercase text-dark">
        Select Your Layout
      </h3>

      {/* Grid for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 justify-center">
        {data?.cards?.map((card, index) => (
          <div key={index} className="flex justify-center w-full">
            <div className="w-full max-w-xs sm:max-w-[18rem] md:max-w-[19rem] h-56 perspective-1000">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group hover:rotate-y-180">

                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-md shadow-md flex flex-col items-center justify-center border border-gray-200 p-3">
                  <Link
                    to="/layout"
                    onClick={() => dispatch(setSelectLayout(card?.layout))}
                    className="no-underline text-center w-full h-full flex flex-col items-center justify-center"
                  >
                    <img
                      src={card?.img}
                      alt={card?.title}
                      className="h-32 w-auto object-contain mb-2"
                    />
                    <div className="text-dark font-bold font-heading text-sm mt-auto">
                      Layout {index + 1}
                    </div>
                  </Link>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-dark rounded-md shadow-md transform rotate-y-180 flex flex-col justify-center items-center p-3 overflow-hidden">
                  <Link
                    onClick={() => {
                      dispatch(setSelectLayout(card?.layout));
                      if (card.layout === "Layout") {
                        dispatch(setAddedModels([]));
                      }
                    }}
                    to={`${card.layout === "Layout" ? "/van" : "/layout"}`}
                    className="no-underline w-full h-full flex flex-col"
                  >
                    <h6 className="font-bold text-center text-brand font-heading mb-2 text-sm sm:text-sm md:text-base">{card?.layout}</h6>

                    {/* Scrollable Includes List */}
                    {card?.includes?.length > 0 ? (
                      <div className="w-full flex-1 overflow-y-auto custom-scroll">
                        <ul className="text-left pl-3 mt-0 mb-1 list-disc text-xs sm:text-xs md:text-sm">
                          {card.includes.map((point, i) => (
                            <li key={i} className="mb-1 text-brand tracking-tighter">{point.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="text-center text-brand text-xs sm:text-xs md:text-sm">No parts with this layout</div>
                    )}

                    {card?.includes?.length > 0 && (
                      <div className="text-center mt-3 py-2">
                        <span className="inline-flex items-center bg-brand text-dark text-xs sm:text-xs md:text-sm font-semibold px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                          </svg>
                          Select Layout
                        </span>
                      </div>
                    )}
                  </Link>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  );
};

export default LandingPage;