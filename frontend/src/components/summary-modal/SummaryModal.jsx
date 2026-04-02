import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAddedModels } from '../../redux/slices/addedModels.js'
import Swal from "sweetalert2";
import { handleGetQuote } from '../../CustomHooks/handleQuote.js';
import { ImageWithSkeleton, Heading2, RichParagraph } from "../Common/Common"

export default function SummaryModal({
  SummaryModal,
  setSummaryModal,
  BaseVan,
  setLoading
}) {
  const dispatch = useDispatch();
  const addedModels = useSelector((state) => state.addedModels.addedModels);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClose = () => setSummaryModal(false);

  const handleRemoveItem = (itemId) => {
    Swal.fire({
      title: "Remove Item?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "var(--color-secondary)",
      confirmButtonText: "Remove",
      cancelButtonText: "Keep",
      target: document.body,
      zIndex: 99999,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedModels = addedModels.filter((item) => item.label !== itemId);
        dispatch(setAddedModels(updatedModels));
        Swal.fire({
          title: "Removed!",
          text: "Item has been removed from your selection",
          icon: "success",
          confirmButtonColor: "var(--color-primary)",
        });
      }
    });
  };

  const handleConfirmOrder = () => {
    setSummaryModal(false);
    handleGetQuote(addedModels, dispatch, BaseVan, setLoading);
  };

  if (!SummaryModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-secondary rounded-lg shadow-2xl w-[95%] max-w-5xl h-[90vh] flex flex-col overflow-hidden border border-gray-200">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛒</span>
            <Heading2 text="Your Selection" className="text-primary font-bold text-xl" />
            <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {addedModels.length}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-primary hover:text-primary text-3xl font-light transition-colors duration-200 hover:rotate-90 transform"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 bg-secondary">
          {addedModels.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-secondary">
              <span className="text-5xl mb-4 opacity-50">🛒</span>
              <RichParagraph className="text-lg font-medium">No items selected</RichParagraph>
              <p className="text-sm mt-2 opacity-70">Add items to see them here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {addedModels.map((item, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-lg border border-gray-200 p-4 flex flex-col hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="relative">
                      <ImageWithSkeleton
                        src={item.image}
                        alt={item.label}
                        className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <RichParagraph
                        className="font-semibold text-primary text-sm leading-tight truncate"
                        title={item.label}
                      >
                        {item.label}
                      </RichParagraph>
                      <RichParagraph className="text-primary !text-xs mt-1 font-medium">
                        {item.category}
                      </RichParagraph>
                      <span className="inline-block mt-2 text-xs bg-gray-100 text-primary px-2 py-0.5 rounded">
                        {item.group}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-primary hover:text-primary/80 text-xs font-medium transition-colors flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.label)}
                      className="text-red-600 hover:text-red-600 text-xs font-medium transition-colors flex items-center gap-1 group-hover:text-red-500"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 bg-white flex justify-center items-center">
          <button
            onClick={handleClose}
            className="px-6 py-2.5 rounded-lg border border-secondary/70 text-primary hover:bg-gray-50 font-medium text-sm transition-all duration-200"
          >
            Continue Shopping
          </button>

          <button
            onClick={handleConfirmOrder}
            disabled={addedModels.length === 0}
            className="px-8 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <span>Confirm Order</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* Item Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-[95%] max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">

              {/* Detail Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <span>📄</span>
                  Item Details
                </h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-secondary hover:text-primary text-2xl font-light transition-colors"
                  aria-label="Close details"
                >
                  &times;
                </button>
              </div>

              {/* Detail Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-2/5">
                    <div className="rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <ImageWithSkeleton
                        src={selectedItem.image}
                        alt={selectedItem.label}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-primary uppercase tracking-wider">Label</label>
                      <p className="text-primary font-semibold text-lg mt-1">{selectedItem.label}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-primary uppercase tracking-wider">Category</label>
                        <p className="text-primary font-medium mt-1">{selectedItem.category}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-primary uppercase tracking-wider">Group</label>
                        <p className="text-primary font-medium mt-1">{selectedItem.group}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-primary uppercase tracking-wider">Description</label>
                      <div className="mt-2 bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <p className="text-primary text-sm leading-relaxed whitespace-pre-line">
                          {selectedItem.description || 'No description available for this item.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-6 py-2 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}