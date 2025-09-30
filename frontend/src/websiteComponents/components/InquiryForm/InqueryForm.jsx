"use client";
import { useState } from "react";
import {submitInquiry} from "../../../api/inquiry/submitInquiry"
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Check } from "lucide-react";

// --- Form Data and Components ---

const formQuestions = [
  // Step 1: Travel Info
  {
    step: 1,
    title: "Travel Info",
    questions: [
      {
        id: "plans",
        question: "What are your plans for the van?",
        // This remains a checkbox (multi-select)
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
        inputType: 'radio', // Changed to radio (single-select)
        options: [
          "1-2 people",
          "3-4 people",
          "5-6",
          "more than 6",
        ],
      },
    ],
  },
  // Step 2: Van Preferences
  {
    step: 2,
    title: "Van Preferences",
    questions: [
      {
        id: "vanSize",
        question: "Do you prefer a short or a long van?",
        // This remains a checkbox (multi-select)
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
        inputType: 'radio', // Changed to radio (single-select)
        options: [
          "Yes, a 12v one being able to work off the grid",
          "Yes, a 110v one and I will use it while connected to shore power only",
          "No, I don’t need A/C",
          "I’d rather have 2 roof fans",
        ],
      },
      {
        id: "shower",
        question: "What best describes your shower needs?",
        inputType: 'radio', // Changed to radio (single-select)
        options: [
          "Indoor full standing proper bathroom",
          "Indoor pop up or folding hidden shower",
          "Outdoor rear shower is fine",
          "I don’t need one",
        ],
      },
    ],
  },
  // Step 3: Comfort Options
  {
    step: 3,
    title: "Comfort & Utilities",
    questions: [
      {
        id: "electrical",
        question: "What best describes your electrical needs?",
        inputType: 'radio', // Changed to radio (single-select)
        options: [
          "I just need to charge my electronics and run the fridge",
          "I want to use A/C, induction, microwave, hairdryer, etc.",
          "I want to live off the grid for as long as possible",
        ],
      },
      {
        id: "heating",
        question: "What heating system do you plan on?",
        inputType: 'radio', // Changed to radio (single-select)
        options: [
          "advanced glycol combined water and air heater",
          "diesel air heater under the passenger seat and 110v water heater",
          "diesel air heater under the passenger seat and 12v water heater",
          "not that important right now",
        ],
      },
    ],
  },
  // Step 4: Final Details
  {
    step: 4,
    title: "Final Details",
    questions: [
      {
        id: "sleeping",
        question: "What are your sleeping arrangements?",
        // This remains a checkbox (multi-select)
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
        inputType: 'radio', // Changed to radio (single-select)
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
        inputType: 'radio', // Changed to radio (single-select)
        options: [
            "I drive mostly on paved roads and RWD van is fine",
            "I am going off-road and drive when it is snowing. I need AWD",
            "I am not sure yet",
        ],
      },

      {
        id: "budget",
        question: "Separate from the purchase of the van, how much do you want to spend on the build-out?",
         inputType: 'radio',
        options: [
          "$79K - $99K",
          "$100K - $119K",
          "$120K+",
        ],
      },
      {
        id: "payment",
        question: "How are you paying for the van and conversion?",
        // This remains a checkbox (multi-select)
        options: [
          "Finance just the Van and pay cash for conversion",
          "Pay cash for both Van and conversion",
          "I am still figuring that out",
        ],
      },
    ],
  },
  // Summary Page
  {
    step: 5,
    title: "Summary",
    questions: [],
  },
  // Contact info is the final step
  {
    step: 6,
    title: "Contact Info",
    questions: [
      {
        id: "phone",
        question: "Please leave your phone number below, and we will text you all the info (OPTIONAL)",
        type: "text",
        placeholder: "Phone Number",
      },
      {
        id: "email",
        question: "OR leave your e-mail address below, and we will send you all the info",
        type: "email",
        placeholder: "Email Address",
      },
    ],
  },
];

const buttonVariants = {
  initial: {
    scale: 1,
    borderColor: '#444',
    color: '#a0a0a0',
  },
  hover: {
    scale: 1.05,
    borderColor: '#fff',
    color: '#fff',
    boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)',
  },
  tap: {
    scale: 0.95,
  },
  disabled: {
    opacity: 0.3,
    scale: 1,
    borderColor: '#444',
    color: '#a0a0a0',
  },
};

const QuestionGroup = ({ question, selected, onSelect }) => {
  const isRadio = question.inputType === 'radio';

  const isChecked = (option) => {
    if (isRadio) {
      return selected === option;
    }
    return (selected || []).includes(option);
  };

  return (
    <div className="form-group mb-8">
      <h3 className="text-xl font-bold mb-4">{question.question}</h3>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {question.options.map((option, index) => (
          <motion.label
            key={index}
            htmlFor={`${question.id}-${index}`}
            className="relative block"
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
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
            <motion.span
              className={`flex items-center h-full p-4 rounded-lg cursor-pointer transition-all duration-300 border justify-between
                          ${isChecked(option) ? 'text-white border-[#0f95be] shadow-lg' : 'bg-[#1f1f1f] text-gray-300 border-[#444] hover:border-white'}`}
              style={isChecked(option) ? {
                backgroundImage: 'linear-gradient(to right, #0f95be, #534bff, #140aff, #0f95be)',
                backgroundSize: '200% auto',
              } : {}}
              animate={isChecked(option) ? { backgroundPositionX: ['0%', '-100%'] } : {}}
              transition={{
                duration: 8,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {option}
              {isChecked(option) && (
                <Check className="ml-2 text-white h-5 w-5" />
              )}
            </motion.span>
          </motion.label>
        ))}
      </motion.div>
    </div>
  );
};


const ContactField = ({ question, value, onSelect }) => (
  <div className="form-group mb-8 flex justify-center">
    <div className="w-full md:w-3/4">
      <h3 className="text-xl font-bold mb-4">{question.question}</h3>
      <input
        type={question.type}
        name={question.id}
        value={value}
        onChange={(e) => onSelect(question.id, e.target.value)}
        className="w-full bg-[#1f1f1f] text-gray-300 border border-[#444] rounded-lg p-4 transition-all duration-300 focus:outline-none focus:border-[#0f95be] focus:scale-105"
        placeholder={question.placeholder}
      />
    </div>
  </div>
);

const Summary = ({ formData }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <h3 className="text-2xl font-bold mb-4">Review Your Choices</h3>
    {Object.keys(formData).map(key => {
      const questionData = formQuestions.flatMap(step => step.questions).find(q => q.id === key);
      const value = formData[key];

      if (!value || (Array.isArray(value) && value.length === 0)) {
        return null; // Skip empty fields
      }

      return (
        <div key={key} className="bg-[#1f1f1f] p-4 rounded-lg border border-[#444]">
          <p className="text-gray-400 text-sm">{questionData?.question || key}</p>
          <p className="text-lg text-white mt-1">
            {Array.isArray(value) ? value.join(", ") : value}
          </p>
        </div>
      );
    })}
  </motion.div>
);

const SubmitButton = ({ isLoading }) => (
  <motion.button
    type="submit"
    className="px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 w-full md:w-auto"
    style={{
      backgroundImage: 'linear-gradient(90deg, #534bff, #0f95be, #140aff, #534bff)',
      backgroundSize: '200% auto',
      color: 'white',
      boxShadow: '0 4px 15px rgba(83, 75, 255, 0.4)',
    }}
    animate={{ backgroundPositionX: ['0%', '-200%'] }}
    transition={{
      duration: 8,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    }}
    whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(83, 75, 255, 0.6)' }}
    whileTap={{ scale: 0.95 }}
    disabled={isLoading}
  >
    {isLoading ? "Submitting..." : "Submit"}
    <ArrowUpRight size={20} />
  </motion.button>
);

export default function InqueryForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [validationMessage, setValidationMessage] = useState(null);

  const handleSelect = (questionId, optionValue) => {
    setValidationMessage(null); // Clear validation on new selection
    setFormData(prev => {
      const question = formQuestions.flatMap(step => step.questions).find(q => q.id === questionId);

      if (question.type === 'text' || question.type === 'email') {
        return { ...prev, [questionId]: optionValue };
      }

      if (question.inputType === 'radio') {
        return { ...prev, [questionId]: optionValue };
      }

      // Handle checkbox (multi-select) logic
      const currentSelection = prev[questionId] || [];
      if (currentSelection.includes(optionValue)) {
        return {
          ...prev,
          [questionId]: currentSelection.filter(option => option !== optionValue)
        };
      } else {
        return {
          ...prev,
          [questionId]: [...currentSelection, optionValue]
        };
      }
    });
  };

  const isFormComplete = () => {
    if (isSummaryStep) {
        return true; // Summary step is always complete for navigation
    }

    const currentStepQuestions = formQuestions[currentStep].questions;

    // Validation for contact info page
    if (isLastStep) {
        const { phone, emails } = formData;
        const hasEmail = emails && emails.trim() !== '';
        const hasPhone = phone && phone.trim() !== '';

        if (!hasEmail && !hasPhone) return false; // At least one must be present

        if (hasEmail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emails)) return false;
        }

        if (hasPhone) {
            const numericPhone = phone.replace(/\D/g, '');
            if (numericPhone.length < 5) return false;
        }

        return true;
    }

    // Validation for all other steps (checkboxes & radios)
    return currentStepQuestions.every(q => {
        const selectedValue = formData[q.id];

        if (q.inputType === 'radio') {
            // For radio, we expect a non-empty string
            return typeof selectedValue === 'string' && selectedValue.trim() !== '';
        } else {
            // Default to checkbox logic: expect an array with at least one item
            return Array.isArray(selectedValue) && selectedValue.length > 0;
        }
    });
  };

  const handleNext = () => {
    if (isFormComplete()) {
      setValidationMessage(null);
      if (currentStep < formQuestions.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      setValidationMessage("Please answer all questions to proceed.");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setValidationMessage(null); // Clear validation message on back
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormComplete()) {
      setValidationMessage("Please provide either a valid email or phone number.");
      return;
    }

    setIsLoading(true);
    setMessage(null);

    console.log("Form data submitted:", formData);

    const result = await submitInquiry(formData);

    if (result.success) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // optional delay
      setMessage({ type: "success", text: "✅ Form submitted successfully!" });
      setFormData({});
      setCurrentStep(0);
    } else {
      setMessage({ type: "error", text: `❌ ${result.message}` });
    }

    setIsLoading(false);
    setTimeout(() => setMessage(null), 5000);
  };


  const isLastStep = currentStep === formQuestions.length - 1;
  const isSummaryStep = currentStep === formQuestions.length - 2;
  const allSteps = formQuestions.map(q => q.title);

  const renderFormContent = () => {
    if (isSummaryStep) {
      return <Summary formData={formData} />;
    }

    const currentQuestionGroup = formQuestions[currentStep];

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionGroup.step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {currentQuestionGroup.questions.map(q => {
            if (q.type) {
              return (
                <ContactField
                  key={q.id}
                  question={q}
                  value={formData[q.id] || ''}
                  onSelect={handleSelect}
                />
              );
            }
            return (
              <QuestionGroup
                key={q.id}
                question={q}
                selected={formData[q.id]}
                onSelect={handleSelect}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    );
  };

  const progress = ((currentStep + 1) / formQuestions.length) * 100;

  return (
    <div className="bg-[#111111] text-[#f0f0f0]  min-h-screen flex items-center justify-center p-8 pt-24 relative overflow-hidden">
      {/* Animated background lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-20"
        style={{
          background: 'repeating-linear-gradient(45deg, #1f1f1f, #1f1f1f 10px, #2a2a2a 10px, #2a2a2a 20px)',
          backgroundSize: '40px 40px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      />

      <div className="max-w-4xl w-full relative z-10">

        <motion.p
          className="text-lg text-white text-center mb-3"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          STILL WONDERING WHAT TO CHOOSE?
        </motion.p>
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <motion.span
            className="bg-clip-text mb-2 text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to right, #ffffff, #0f95be, #7673dcff, #534bff, #ffffff)',
              backgroundSize: '200% auto',
            }}
            animate={{ backgroundPositionX: ['0%', '-200%'] }}
            transition={{
              duration: 10,
              transition: "all 0.3s ease",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            Get a Quote
          </motion.span>
        </motion.h1>
        <motion.div
          className="bg-[#212121] rounded-2xl border-2 border-gray-700 shadow-2xl p-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            borderColor: ['#444', '#0f95be', '#444'], // Border glow
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            borderColor: {
              duration: 6, // Duration for the border glow
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }
          }}
          whileHover={{
            y: -5, // Lift effect on hover
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)", // Expanded shadow on hover
            scale: 1.01
          }}
        >
          {/* Left Panel: Progress and Navigation */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold mb-4">Questions</h3>
            <ul className="space-y-2">
              {allSteps.map((title, index) => (
                <li key={index}
                    // Optional: Allow jumping to already completed steps
                    // onClick={() => index < currentStep && setCurrentStep(index)}
                    className={`transition-colors duration-300
                               ${currentStep === index ? 'text-[#0f95be] font-semibold' : 'text-gray-400'}`}>
                  {`Step ${index + 1}: ${title}`}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Panel: Current Question */}
          <div className="w-full md:w-3/4">
            {/* Progress Bar */}
            <div className="w-full bg-[#1f1f1f] rounded-full h-2 mb-8">
              <motion.div
                className="bg-[#0f95be] h-2 rounded-full"
                initial={{ width: `${((currentStep) / formQuestions.length) * 100}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
            <form onSubmit={handleSubmit}>
              {renderFormContent()}

              <div className="flex justify-between items-center mt-8">
                <motion.button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="px-6 py-2 rounded-full border flex items-center gap-2 transition-all duration-300"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  animate={currentStep === 0 ? "disabled" : "initial"}
                >
                  <ChevronLeft size={20} /> Previous
                </motion.button>

                {validationMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-500 text-center mx-2"
                  >
                    {validationMessage}
                  </motion.div>
                )}

                {isLastStep ? (
                  <SubmitButton isLoading={isLoading} />
                ) : (
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 rounded-full border flex items-center gap-2 transition-all duration-300"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    animate={isFormComplete() ? "initial" : "initial"} // Button is always active-looking, validation shown via text
                  >
                    {isSummaryStep ? 'Continue' : 'Next'} <ChevronRight size={20} />
                  </motion.button>
                )}
              </div>
            </form>
          </div>
        </motion.div>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.8 }}
              className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 z-[100]
                          ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
            >
              {message.text}
              <button onClick={() => setMessage(null)} className="ml-auto">
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}