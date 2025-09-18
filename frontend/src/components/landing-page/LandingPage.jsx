import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectLayout } from "../../redux/slices/selectLayout";
import { setAddedModels } from "../../redux/slices/addedModels";
import data from "../../json data/newCard.json";
import { useState } from "react";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCard, setSelectedCard] = useState(null); // For modal

  const handleSelectLayout = (card) => {
    dispatch(setSelectLayout(card?.layout));
    if (card.layout === "First Layout") {
      dispatch(setAddedModels([]));
      navigate("/van");
    }
    else{
      navigate("/layout"); // redirect to configurator
    }
  };

  return (
    <div className="min-h-screen bg-brand">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl mx-auto">
          <h3 className="text-center py-2 mb-2 text-2xl font-heading font-bold sm:text-2xl md:text-3xl uppercase text-dark">
            Select Your Layout
          </h3>
 <div className="flex justify-between items-center w-full px-6 py-4 ">
      <Link to="/admin">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Admin
        </button>
      </Link>

      <Link to="/preview">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Preview
        </button>
      </Link>
    </div>
          {/* Grid for Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
            {data?.cards?.map((card, index) => (
              <div key={index} className="flex justify-center w-full">
                <div className="w-full max-w-xs sm:max-w-[18rem] md:max-w-[20rem] h-56 rounded-md shadow-md overflow-hidden relative">
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                      src={card?.img}
                      alt={card?.title}
                      className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-all duration-300 p-3">
                    <span className="text-white font-bold text-sm mb-2">
                      Includes:
                    </span>
                    <ul className="text-white text-xs text-center">
                      {card.includes.slice(0, 3).map((point, i) => (
                        <li key={i}>{point.trim()}</li>
                      ))}
                      {card.includes.length > 3 && (
                        <li>+{card.includes.length - 3} more</li>
                      )}
                    </ul>

                    {/* View Details → Open Modal */}
                    <button
                      onClick={() => setSelectedCard(card)}
                      className="mt-3 px-4 py-2 bg-brand text-dark text-xs font-semibold rounded-md shadow-md hover:shadow-lg transition-all"
                    >
                      View Details
                    </button>
                  </div>

                  {/* Layout label */}
                  <div className="absolute bottom-2 left-0 right-0 -z-1 text-dark  font-bold font-heading text-xl text-center">
                    Layout {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            {/* Card Title */}
            <h2 className="text-xl font-bold text-dark mb-4 text-center">
              {selectedCard.layout}
            </h2>

            {/* Includes List */}
            <div className="max-h-64 overflow-y-auto mb-4">
              <ul className="list-disc list-inside text-sm text-gray-800">
                {selectedCard.includes.map((point, i) => (
                  <li key={i}>{point.trim()}</li>
                ))}
              </ul>
            </div>

            {/* Select Layout Button */}
            <button
              onClick={() => handleSelectLayout(selectedCard)}
              className="w-full bg-brand text-dark font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all"
            >
              Select Layout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
