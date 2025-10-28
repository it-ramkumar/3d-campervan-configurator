"use client";
import { useState } from "react";
import { submitInquiry } from "../../../api/inquiry/submitInquiry";
import Navbar from "../Navbar/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Check } from "lucide-react";

// --------------------------- FORM QUESTIONS --------------------------- //
const formQuestions = [
  {
    step: 1,
    title: "Travel Info",
    questions: [
      {
        id: "plans",
        question: "What are your plans for the van?",
        options: [
          "Full time van living",
          "Weekend and short trips",
          "Use for business",
          "No clue yet",
        ],
      },
      {
        id: "people",
        question: "How many people will typically travel in your van?",
        inputType: "radio",
        options: ["1-2 people", "3-4 people", "5-6", "more than 6"],
      },
    ],
  },
  {
    step: 2,
    title: "Van Preferences",
    questions: [
      {
        id: "vanSize",
        question: "Do you prefer a short or a long van?",
        options: [
          "short (Sprinter 144 or Transit 148 or ProMaster 136)",
          "long (Sprinter 170 or Transit 148ext or ProMaster 159)",
          "super long (Sprinter 170ext)",
          "I am not sure yet",
        ],
      },
      {
        id: "ac",
        question: "Do you need an A/C unit?",
        inputType: "radio",
        options: [
          "Yes, a 12v one being able to work off the grid",
          "Yes, a 110v one and I will use it while connected to shore power only",
          "No, I don't need A/C",
          "I'd rather have 2 roof fans",
        ],
      },
      {
        id: "shower",
        question: "What best describes your shower needs?",
        inputType: "radio",
        options: [
          "Indoor full standing proper bathroom",
          "Indoor pop up or folding hidden shower",
          "Outdoor rear shower is fine",
          "I don't need one",
        ],
      },
    ],
  },
  {
    step: 3,
    title: "Comfort & Utilities",
    questions: [
      {
        id: "electrical",
        question: "What best describes your electrical needs?",
        inputType: "radio",
        options: [
          "I just need to charge my electronics and run the fridge",
          "I want to use A/C, induction, microwave, hairdryer, etc.",
          "I want to live off the grid for as long as possible",
        ],
      },
      {
        id: "heating",
        question: "What heating system do you plan on?",
        inputType: "radio",
        options: [
          "advanced glycol combined water and air heater",
          "diesel air heater under the passenger seat and 110v water heater",
          "diesel air heater under the passenger seat and 12v water heater",
          "not that important right now",
        ],
      },
    ],
  },
  {
    step: 4,
    title: "Final Details",
    questions: [
      {
        id: "sleeping",
        question: "What are your sleeping arrangements?",
        options: [
          "Stationary bed with garage storage area underneath",
          "Electric bed that goes up and down with dinette below",
          "Seating benches and a table that transform to bed",
          "Murphy fold away bed",
        ],
      },
      {
        id: "haveVan",
        question: "Do you have a van?",
        inputType: "radio",
        options: [
          "Yes, I have a van already",
          "No, I need your help to source one",
          "I want to purchase a ready to go camper van",
          "I am currently in the initial stages of gathering information",
        ],
      },
      {
        id: "roads",
        question: "Where are you taking your van?",
        inputType: "radio",
        options: [
          "I drive mostly on paved roads and RWD van is fine",
          "I am going off-road and drive when it is snowing. I need AWD",
          "I am not sure yet",
        ],
      },
      {
        id: "budget",
        question: "Separate from the van purchase, how much for the build-out?",
        inputType: "radio",
        options: ["$79K - $99K", "$100K - $119K", "$120K+"],
      },
      {
        id: "payment",
        question: "How are you paying for the van and conversion?",
        options: [
          "Finance just the Van and pay cash for conversion",
          "Pay cash for both Van and conversion",
          "I am still figuring that out",
        ],
      },
    ],
  },
  { step: 5, title: "Summary", questions: [] },
  {
    step: 6,
    title: "Contact Info",
    questions: [
      {
        id: "phone",
        question: "Please leave your phone number below (OPTIONAL)",
        type: "text",
        placeholder: "Phone Number",
      },
      {
        id: "email",
        question: "OR leave your e-mail address below",
        type: "email",
        placeholder: "Email Address",
      },
    ],
  },
];

// --------------------------- FORM COMPONENT --------------------------- //

const QuestionGroup = ({ question, selected, onSelect }) => {
  const isRadio = question.inputType === "radio";
  const isChecked = (option) =>
    isRadio ? selected === option : (selected || []).includes(option);

  return (
    <div className="form-group mb-8">
      <h3 className="text-xl font-semibold mb-4 text-black">{question.question}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {question.options.map((option, i) => (
          <motion.label key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <input
              type={isRadio ? "radio" : "checkbox"}
              value={option}
              checked={isChecked(option)}
              onChange={() => onSelect(question.id, option)}
              className="hidden"
            />
            <span
              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all
              ${isChecked(option)
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black hover:bg-gray-100"}`}
            >
              {option}
              {isChecked(option) && <Check className="ml-2 h-5 w-5" />}
            </span>
          </motion.label>
        ))}
      </div>
    </div>
  );
};

const ContactField = ({ question, value, onSelect }) => (
  <div className="form-group mb-8 flex justify-center">
    <div className="w-full md:w-3/4">
      <h3 className="text-xl font-semibold mb-4 text-black">{question.question}</h3>
      <input
        type={question.type}
        value={value}
        onChange={(e) => onSelect(question.id, e.target.value)}
        className="w-full border-2 border-black rounded-lg p-4"
        placeholder={question.placeholder}
      />
    </div>
  </div>
);

const Summary = ({ formData }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <h3 className="text-2xl font-bold text-black mb-4">Review Your Choices</h3>
    {Object.entries(formData).map(([key, val]) => (
      <div key={key} className="border-2 border-black rounded-lg p-4">
        <p className="font-semibold text-black">{key}</p>
        <p className="text-black">{Array.isArray(val) ? val.join(", ") : val}</p>
      </div>
    ))}
  </motion.div>
);

// --------------------------- MAIN COMPONENT --------------------------- //

export default function InquiryForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [validationMessage, setValidationMessage] = useState(null);

  const handleSelect = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    const group = formQuestions[currentStep];
    const unfilled = (group.questions || []).filter(
      (q) => !formData[q.id] || (Array.isArray(formData[q.id]) && formData[q.id].length === 0)
    );
    if (unfilled.length > 0) return setValidationMessage("⚠️ Please complete all required fields.");
    setValidationMessage(null);
    setCurrentStep((s) => Math.min(s + 1, formQuestions.length - 1));
  };

  const handlePrevious = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setValidationMessage(null);

    if (!formData.email && !formData.phone) {
      setValidationMessage("⚠️ Please provide at least your email or phone.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await submitInquiry(formData);
      if (result.success) {
        // setMessage({ type: "success", text: "Form submitted successfully!" });
        setFormData({});
        setCurrentStep(0);
      } else {
        setMessage({ type: "error", text: "Submission failed. Try again." });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Try again." });
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const group = formQuestions[currentStep];
  const isLastStep = currentStep === formQuestions.length - 1;
  const isSummaryStep = currentStep === formQuestions.length - 2;
  const progress = ((currentStep + 1) / formQuestions.length) * 100;

  return (
    <>
      <Navbar />
      <div className="bg-white text-black flex items-center justify-center">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2">Get Your Perfect Van Quote</h1>
            <p className="text-gray-700">Answer a few quick questions and we’ll help you find your dream van.</p>
          </div>

          <div className="border-2 border-black rounded-xl p-6 flex flex-col md:flex-row gap-6 h-[90vh] overflow-scroll">
            {/* Progress Sidebar */}
            <div className="md:w-1/4">
              <h3 className="font-bold mb-3">Your Progress</h3>
              {formQuestions.map((f, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 border border-black rounded mb-1 ${
                    i === currentStep ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}. {f.title}
                </div>
              ))}
            </div>

            {/* Form Area */}
            <div className="md:w-3/4">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <motion.div
                  className="bg-black h-2 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={group.step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {isSummaryStep ? (
                      <Summary formData={formData} />
                    ) : (
                      group.questions.map((q) =>
                        q.type ? (
                          <ContactField
                            key={q.id}
                            question={q}
                            value={formData[q.id] || ""}
                            onSelect={handleSelect}
                          />
                        ) : (
                          <QuestionGroup
                            key={q.id}
                            question={q}
                            selected={formData[q.id]}
                            onSelect={handleSelect}
                          />
                        )
                      )
                    )}
                  </motion.div>
                </AnimatePresence>

                {validationMessage && (
                  <p className="text-red-600 mt-4 text-sm">{validationMessage}</p>
                )}

                {/* Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-black">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className={`px-6 py-3 rounded-lg border-2 border-black ${
                      currentStep === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-black hover:text-white"
                    }`}
                  >
                    <ChevronLeft size={20} /> Previous
                  </button>

                  {!isLastStep ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 bg-black text-white rounded-lg flex items-center gap-2 hover:opacity-90"
                    >
                      {isSummaryStep ? "Continue to Contact" : "Next"}{" "}
                      <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-3 bg-black text-white rounded-lg flex items-center gap-2 hover:opacity-90"
                    >
                      {isLoading ? "Submitting..." : "Submit Quote Request"}{" "}
                      <ArrowUpRight size={20} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Toast */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className={`fixed bottom-4 right-4 p-4 rounded-lg border-2 ${
                  message.type === "success"
                    ? "bg-white text-black border-black"
                    : "bg-black text-white border-white"
                }`}
              >
                {message.text}
                <button onClick={() => setMessage(null)} className="ml-3">
                  <X size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
