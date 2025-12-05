"use client";
import { useState } from "react";
import { submitInquiry } from "../../../api/inquiry/submitInquiry";
import Navbar from "../Navbar/Navbar";
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { formQuestions } from "../../DataUseInComp/InquiryFormData";

// --------------------------- FORM COMPONENT --------------------------- //

const QuestionGroup = ({ question, selected, onSelect }) => {
  // Yahan fix kiya - agar inputType radio hai to radio use karo, nahi to checkbox
  const isRadio = question.inputType === "radio";
  const isChecked = (option) =>
    isRadio ? selected === option : (selected || []).includes(option);

  return (
    <div className="form-group mb-8">
      <h3 className="text-xl font-semibold mb-4 text-black">{question.question}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {question.options.map((option, i) => (
          <label key={i} className="transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <input
              type={isRadio ? "radio" : "checkbox"}
              value={option}
              checked={isChecked(option)}
              onChange={() => onSelect(question.id, option)}
              className="hidden"
            />
            <span
              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
              ${isChecked(option)
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black hover:bg-gray-100"}`}
            >
              {option}
              {isChecked(option) && <Check className="ml-2 h-5 w-5" />}
            </span>
          </label>
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
        className="w-full border-2 border-black rounded-lg p-4 transition-all duration-200 focus:ring-2 focus:ring-black focus:border-transparent"
        placeholder={question.placeholder}
      />
    </div>
  </div>
);

const Summary = ({ formData }) => (
  <div className="space-y-6 animate-fadeIn">
    <h3 className="text-2xl font-bold text-black mb-4">Review Your Choices</h3>
    {Object.entries(formData).map(([key, val]) => (
      <div key={key} className="border-2 border-black rounded-lg p-4 transition-all duration-200 hover:shadow-lg">
        <p className="font-semibold text-black">{key}</p>
        <p className="text-black">{Array.isArray(val) ? val.join(", ") : val}</p>
      </div>
    ))}
  </div>
);

// --------------------------- MAIN COMPONENT --------------------------- //

export default function InquiryForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [validationMessage, setValidationMessage] = useState(null);

  const handleSelect = (id, value) => {
  const group = formQuestions[currentStep];
  const question = group.questions.find((q) => q.id === id);

  // ✅ FIX: Agar input type "text", "email" ya "number" hai, to hamesha string save karo
  if (!question.inputType) {
    setFormData((prev) => ({ ...prev, [id]: value }));
    return;
  }

  if (question.inputType === "radio") {
    setFormData((prev) => ({ ...prev, [id]: value }));
  } else {
    setFormData((prev) => {
      const currentValues = prev[id] || [];
      if (Array.isArray(currentValues)) {
        if (currentValues.includes(value)) {
          return { ...prev, [id]: currentValues.filter((item) => item !== value) };
        } else {
          return { ...prev, [id]: [...currentValues, value] };
        }
      } else {
        return { ...prev, [id]: [value] };
      }
    });
  }
};

  const handleNext = () => {
    const group = formQuestions[currentStep];
    const unfilled = (group.questions || []).filter((q) => {
      if (q.type) return false; // Skip contact fields in validation

      if (q.inputType === "radio") {
        return !formData[q.id]; // Radio requires one selection
      } else {
        return !formData[q.id] || (Array.isArray(formData[q.id]) && formData[q.id].length === 0);
      }
    });

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

    // Contact info validation
    const contactGroup = formQuestions[formQuestions.length - 1]; // Last step is contact
    const hasContactInfo = contactGroup.questions.some(q => formData[q.id]);

    if (!hasContactInfo) {
      setValidationMessage("⚠️ Please provide at least one contact method (phone or email).");
      setIsLoading(false);
      return;
    }

    if (formData.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        setValidationMessage("⚠️ Please enter a valid email address.");
        setIsLoading(false);
        return;
      }
    }

  

    try {
      const result = await submitInquiry(formData);
      if (result.success) {
        setMessage({ type: "success", text: "Form submitted successfully!" });
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
      <div className="bg-white text-black flex items-center justify-center min-h-screen py-8">
        <div className="max-w-4xl w-full mx-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2">Get Your Perfect Van Quote</h1>
            <p className="text-gray-700">Answer a few quick questions and we'll help you find your dream van.</p>
          </div>

          <div className="border-2 border-black rounded-xl p-6 flex flex-col md:flex-row gap-6 min-h-[600px]">
            {/* Progress Sidebar */}
            <div className="md:w-1/4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold mb-3 text-lg">Your Progress</h3>
              <div className="space-y-2">
                {formQuestions.map((f, i) => (
                  <div
                    key={i}
                    className={`px-3 py-2 border border-black rounded transition-all duration-200 ${
                      i === currentStep
                        ? "bg-black text-white shadow-lg transform scale-105"
                        : i < currentStep
                        ? "bg-gray-200 text-gray-700"
                        : "bg-white text-black hover:bg-gray-100 cursor-pointer"
                    }`}
                    onClick={() => i <= currentStep && setCurrentStep(i)}
                  >
                    {i + 1}. {f.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Area */}
            <div className="md:w-3/4">
              <div className="w-full bg-gray-200 rounded-full h-3 mb-8 overflow-hidden">
                <div
                  className="bg-black h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {validationMessage && (
                <div className="mb-6 p-3 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-700">
                  {validationMessage}
                </div>
              )}

              {isLastStep ? (
                <form onSubmit={handleSubmit}>
                  <div className="animate-fadeIn">
                    {group.questions.map((q) =>
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
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-black">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      className={`px-6 py-3 rounded-lg border-2 border-black transition-all duration-200 flex items-center gap-2 ${
                        currentStep === 0
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-black hover:text-white transform hover:scale-105"
                      }`}
                    >
                      <ChevronLeft size={20} /> Previous
                    </button>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-3 bg-black text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Submitting..." : "Submit Quote Request"}{" "}
                      <ArrowUpRight size={20} />
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="animate-fadeIn">
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
                  </div>

                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-black">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      className={`px-6 py-3 rounded-lg border-2 border-black transition-all duration-200 flex items-center gap-2 ${
                        currentStep === 0
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-black hover:text-white transform hover:scale-105"
                      }`}
                    >
                      <ChevronLeft size={20} /> Previous
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 bg-black text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-all duration-200 transform hover:scale-105"
                    >
                      {isSummaryStep ? "Continue to Contact" : "Next"}{" "}
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Toast Message */}
          {message && (
            <div className={`fixed bottom-4 right-4 p-4 rounded-lg border-2 transition-all duration-300 animate-slideUp ${
              message.type === "success"
                ? "bg-white text-black border-black shadow-lg"
                : "bg-black text-white border-white shadow-lg"
            }`}>
              <div className="flex items-center justify-between">
                <span>{message.text}</span>
                <button
                  onClick={() => setMessage(null)}
                  className="ml-3 hover:opacity-70 transition-opacity"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}