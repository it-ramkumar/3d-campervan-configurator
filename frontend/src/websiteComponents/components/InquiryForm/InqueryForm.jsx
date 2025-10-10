"use client";
import { useState } from "react";
import { submitInquiry } from "../../../api/inquiry/submitInquiry";
import Navbar from "../Navbar/Navbar"
import Swal from "sweetalert2";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Check } from "lucide-react";

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
          "Short (Sprinter 144 or Transit 148 or ProMaster 136)",
          "Long (Sprinter 170 or Transit 148ext or ProMaster 159)",
          "Super long (Sprinter 170ext)",
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
          "Advanced glycol combined water and air heater",
          "Diesel air heater under the passenger seat and 110v water heater",
          "Diesel air heater under the passenger seat and 12v water heater",
          "Not that important right now",
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

const QuestionGroup = ({ question, selected, onSelect }) => {
  const isRadio = question.inputType === "radio";
  const isChecked = (option) => (isRadio ? selected === option : (selected || []).includes(option));

  return (
    <div className="form-group mb-8">
      <h3 className="text-xl font-semibold mb-4 text-black">{question.question}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {question.options.map((option, index) => (
          <motion.label
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative block"
          >
            <input
              type={isRadio ? "radio" : "checkbox"}
              id={`${question.id}-${index}`}
              name={question.id}
              value={option}
              checked={isChecked(option)}
              onChange={() => onSelect(question.id, option)}
              className="hidden"
            />
            <span
              className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isChecked(option)
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black hover:bg-gray-100"
              }`}
            >
              {option}
              {isChecked(option) && <Check className="ml-2 text-white h-5 w-5" />}
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
        name={question.id}
        value={value}
        onChange={(e) => onSelect(question.id, e.target.value)}
        className="w-full bg-white text-black border-2 border-black rounded-lg p-4 focus:outline-none focus:border-black focus:ring-0"
        placeholder={question.placeholder}
      />
    </div>
  </div>
);

const Summary = ({ formData }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <h3 className="text-2xl font-bold mb-6 text-black">Review Your Choices</h3>
    {Object.keys(formData).map((key) => (
      <div key={key} className="bg-white p-4 mb-3 rounded-lg border-2 border-black">
        <p className="text-sm font-medium text-black">{key}</p>
        <p className="text-lg font-semibold text-black mt-1">
          {Array.isArray(formData[key]) ? formData[key].join(", ") : formData[key]}
        </p>
      </div>
    ))}
  </motion.div>
);

export default function InquiryForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ Step validation before moving forward
  const handleNext = () => {
    const currentGroup = formQuestions[currentStep];
    const unanswered = currentGroup.questions.filter(
      (q) => !formData[q.id] && q.id !== "message"
    );
    if (unanswered.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Step",
        text: "Please answer all required questions before continuing.",
        confirmButtonText: "OK",
      });
      return;
    }
    if (currentStep < formQuestions.length - 1) setCurrentStep((p) => p + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Final validation before submission
    const missingFields = formQuestions
      .flatMap((group) => group.questions)
      .filter((q) => q.id !== "message" && !formData[q.id]);

    if (missingFields.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please complete all required fields before submitting.",
        confirmButtonText: "OK",
      });
      return;
    }

    // ✅ Show confirmation popup before final submission
    const htmlDetails = Object.entries(formData)
      .map(([key, value]) => `<p><b>${key}:</b> ${Array.isArray(value) ? value.join(", ") : value}</p>`)
      .join("");

    const result = await Swal.fire({
      title: "Confirm Your Details",
      html: `<div style="text-align:left">${htmlDetails}</div>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm & Submit",
      cancelButtonText: "Go Back",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setIsLoading(true);

    try {
      const res = await submitInquiry(formData);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your quote request has been submitted successfully!",
        timer: 2500,
        showConfirmButton: false,
      });
      setFormData({});
      setCurrentStep(0);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong while submitting.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isLastStep = currentStep === formQuestions.length - 1;
  const isSummaryStep = currentStep === formQuestions.length - 2;
  const progress = ((currentStep + 1) / formQuestions.length) * 100;

  const renderFormContent = () => {
    if (isSummaryStep) return <Summary formData={formData} />;
    const group = formQuestions[currentStep];
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={group.step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          {group.questions.map((q) =>
            q.type ? (
              <ContactField key={q.id} question={q} value={formData[q.id] || ""} onSelect={handleSelect} />
            ) : (
              <QuestionGroup key={q.id} question={q} selected={formData[q.id]} onSelect={handleSelect} />
            )
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-white text-black flex items-center justify-center">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Get Your Perfect Van Quote</h1>
            <p className="text-black max-w-2xl mx-auto text-lg">
              Answer a few quick questions and we’ll help you find the ideal van conversion for your adventure.
            </p>
          </div>

          <div className="bg-white rounded-xl border-2 border-black p-6 md:p-8 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 h-[90vh] custom-scroll overflow-scroll">
            <div className="w-full md:w-1/4">
              <h3 className="text-lg font-bold mb-4 text-black">Your Progress</h3>
              <div className="space-y-1">
                {formQuestions.map((q, i) => (
                  <div
                    key={i}
                    className={`py-2 px-3 rounded-lg border border-black transition-colors duration-200 ${
                      currentStep === i
                        ? "bg-black text-white font-semibold"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    {`${i + 1}. ${q.title}`}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-3/4">
              <div className="w-full bg-gray-300 rounded-full h-2 mb-8">
                <motion.div
                  className="bg-black h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <form onSubmit={handleSubmit}>
                {renderFormContent()}

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-black">
                  <motion.button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className={`px-6 py-3 rounded-lg border-2 border-black flex items-center gap-2 transition-all duration-200 font-medium ${
                      currentStep === 0
                        ? "opacity-50 cursor-not-allowed text-gray-500"
                        : "text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    <ChevronLeft size={20} /> Previous
                  </motion.button>

                  {isLastStep ? (
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-3 bg-black text-white rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 hover:opacity-90"
                    >
                      {isLoading ? "Submitting..." : "Submit Quote Request"} <ArrowUpRight size={20} />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 bg-black text-white rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 hover:opacity-90"
                    >
                      {isSummaryStep ? "Continue to Contact" : "Next"}
                      <ChevronRight size={20} />
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
