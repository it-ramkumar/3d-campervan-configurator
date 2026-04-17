"use client";
import { useState } from "react";
import { submitInquiry } from "../../api/inquiry/submitInquiry"
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Check, Loader, ClipboardCheck, Info } from "lucide-react";
import { formQuestions } from "../../DataUseInComp/InquiryFormData";
import { useRouter } from "next/navigation";
import { Heading2,Heading1} from "../Common/Common";

// --------------------------- SUB-COMPONENTS --------------------------- //

const QuestionGroup = ({ question, selected, onSelect }) => {
  const isRadio = question.inputType === "radio";
  const isChecked = (option) =>
    isRadio ? selected === option : (selected || []).includes(option);

  return (
    <div className="form-group mb-10 animate-fadeIn">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-6 bg-hover rounded-full" />
        <h3 className="text-xl lg:text-2xl font-bold text-primary tracking-tight">
          {question.question}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, i) => (
          <label key={i} className="relative group cursor-pointer">
            <input
              type={isRadio ? "radio" : "checkbox"}
              value={option}
              checked={isChecked(option)}
              onChange={() => onSelect(question.id, option)}
              className="hidden"
            />
            <div
              className={`flex items-center justify-between p-5 border-2 rounded-[var(--radius-md)] transition-all duration-300
              ${isChecked(option)
                ? "bg-primary text-white border-primary shadow-xl scale-[1.02]"
                : "bg-white text-primary border-primary/10 hover:border-hover hover:bg-secondary/50"}`}
            >
              <span className="font-semibold tracking-wide">{option}</span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                ${isChecked(option) ? "bg-hover border-hover" : "border-primary/20 group-hover:border-hover"}`}>
                {isChecked(option) && <Check className="text-white h-4 w-4" strokeWidth={4} />}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

const ContactField = ({ question, value, onSelect }) => (
  <div className="form-group mb-8 animate-fadeIn">
    <div className="max-w-xl mx-auto">
      <h3 className="text-lg font-bold mb-3 text-primary uppercase tracking-widest text-center">
        {question.question}
      </h3>
      <input
        type={question.type}
        value={value}
        onChange={(e) => onSelect(question.id, e.target.value)}
        className="w-full bg-secondary border-2 border-primary/10 rounded-[var(--radius-md)] p-5 text-lg transition-all duration-300 focus:ring-4 focus:ring-hover/10 focus:border-hover outline-none text-primary placeholder:text-primary/30 shadow-inner"
        placeholder={question.placeholder}
      />
    </div>
  </div>
);

const Summary = ({ formData }) => (
  <div className="space-y-4 animate-fadeIn">
    <div className="flex items-center gap-3 mb-8 border-b border-primary/10 pb-4">
      <ClipboardCheck className="!text-hover" size={28} />
      <Heading2 text="Review Configuration" className="!mb-0 !text-primary" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(formData).map(([key, val]) => (
        <div key={key} className="bg-secondary/50 p-5 rounded-[var(--radius-md)] border border-primary/5">
          <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-1">{key.replace(/_/g, ' ')}</p>
          <p className="font-bold text-primary">{Array.isArray(val) ? val.join(", ") : val}</p>
        </div>
      ))}
    </div>
    <div className="mt-8 p-4 bg-hover/5 rounded-[var(--radius-sm)] flex gap-3 items-start">
      <Info size={20} className="!text-hover flex-shrink-0 mt-0.5" />
      <p className="text-sm text-primary/60 italic">Please double-check your selections. You can still go back to any step if you need to make changes.</p>
    </div>
  </div>
);

// --------------------------- MAIN COMPONENT --------------------------- //

export default function InquiryForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [validationMessage, setValidationMessage] = useState(null);
  const navigate = useRouter();

  const handleSelect = (id, value) => {
    const group = formQuestions[currentStep];
    const question = group.questions.find((q) => q.id === id);

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
        }
        return { ...prev, [id]: [value] };
      });
    }
  };

  const handleNext = () => {
    const group = formQuestions[currentStep];
    const unfilled = (group.questions || []).filter((q) => {
      if (q.type) return false;
      if (q.inputType === "radio") return !formData[q.id];
      return !formData[q.id] || (Array.isArray(formData[q.id]) && formData[q.id].length === 0);
    });

    if (unfilled.length > 0) return setValidationMessage("⚠️ Please select an option to continue.");
    setValidationMessage(null);
    setCurrentStep((s) => Math.min(s + 1, formQuestions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
    setValidationMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const contactGroup = formQuestions[formQuestions.length - 1];
    const hasContactInfo = contactGroup.questions.some(q => formData[q.id]);

    if (!hasContactInfo) {
      setValidationMessage("⚠️ Please provide contact details so we can reach you.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await submitInquiry(formData);
      if (result.success) {
        // setMessage({ type: "success", text: "Your van inquiry has been received! Our team will contact you soon." });
        setFormData({});
        setCurrentStep(0);
        navigate.push("/thank-you", { state: { email: formData.email } });
      } else {
        console.log(result.error)
        console.log(result)

        setMessage({ type: "error", text: "Something went wrong. Please try again." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  const group = formQuestions[currentStep];
  const isLastStep = currentStep === formQuestions.length - 1;
  const isSummaryStep = currentStep === formQuestions.length - 2;
  const progress = ((currentStep + 1) / formQuestions.length) * 100;

  return (
    <>
      <div className="bg-secondary min-h-screen py-20 px-4">
        <div className="max-w-6xl w-full mx-auto">

          <div className="text-center mb-16">
            <p className="!text-hover font-black text-xs uppercase tracking-[0.4em] mb-4">Configurator</p>
            <Heading1 text="Build Your Dream Van" className="!text-primary" />
            <div className="w-24 h-1 bg-hover mx-auto mt-6 rounded-full" />
          </div>

          <div className="flex flex-col lg:flex-row gap-10">

            {/* --- LEFT SIDEBAR: PROGRESS --- */}
            <aside className="lg:w-1/3 order-2 lg:order-1">
              <div className="bg-white p-8 rounded-[var(--radius-lg)] border border-primary/5 shadow-sm sticky top-32">
                <h3 className="font-black text-primary uppercase text-[10px] tracking-widest mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-hover rounded-full animate-pulse" />
                  Your Journey
                </h3>
                <div className="space-y-3">
                  {formQuestions.map((f, i) => (
                    <div
                      key={i}
                      onClick={() => i <= currentStep && setCurrentStep(i)}
                      className={`group relative pl-6 py-3 border-l-2 transition-all duration-500 cursor-pointer
                        ${i === currentStep ? "border-hover text-primary font-bold" :
                          i < currentStep ? "border-primary text-primary/40" : "border-primary/10 text-primary/20"}`}
                    >
                      <div className={`absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-500
                        ${i <= currentStep ? "bg-hover scale-125" : "bg-primary/10"}`} />
                      <span className="text-xs uppercase tracking-widest">{f.title}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-secondary">
                   <div className="flex justify-between items-end mb-2">
                      <p className="text-[10px] font-black uppercase text-primary/30 tracking-tighter">Completion</p>
                      <p className="text-primary font-bold text-sm">{Math.round(progress)}%</p>
                   </div>
                   <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                      <div className="bg-hover h-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                   </div>
                </div>
              </div>
            </aside>

            {/* --- MAIN FORM AREA --- */}
            <main className="lg:w-2/3 order-1 lg:order-2">
              <div className="bg-white p-8 lg:p-12 rounded-[var(--radius-lg)] border border-primary/5 shadow-2xl min-h-[600px] flex flex-col">

                {/* Steps Info */}
                <div className="mb-10 flex justify-between items-center">
                   <span className="bg-secondary px-4 py-1 rounded-full text-[10px] font-black text-primary/40 uppercase tracking-widest">Step {currentStep + 1} of {formQuestions.length}</span>
                   {validationMessage && (
                     <p className="text-red-500 text-xs font-bold animate-bounce">{validationMessage}</p>
                   )}
                </div>

                <div className="flex-grow">
                  {isLastStep ? (
                    <form id="inquiryForm" onSubmit={handleSubmit} className="space-y-8">
                      {group.questions.map((q) => (
                        q.type ? (
                          <ContactField key={q.id} question={q} value={formData[q.id] || ""} onSelect={handleSelect} />
                        ) : (
                          <QuestionGroup key={q.id} question={q} selected={formData[q.id]} onSelect={handleSelect} />
                        )
                      ))}
                    </form>
                  ) : (
                    <>
                      {isSummaryStep ? (
                        <Summary formData={formData} />
                      ) : (
                        group.questions.map((q) => (
                          <QuestionGroup key={q.id} question={q} selected={formData[q.id]} onSelect={handleSelect} />
                        ))
                      )}
                    </>
                  )}
                </div>

                {/* --- NAVIGATION BUTTONS --- */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-12 pt-8 border-t border-secondary">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 0 || isLoading}
                    className={`flex items-center gap-2 px-8 py-4 font-black text-[10px] uppercase tracking-[0.2em] transition-all
                      ${currentStep === 0 ? "opacity-0 pointer-events-none" : "text-primary hover:!text-hover"}`}
                  >
                    <ChevronLeft size={16} /> Previous Step
                  </button>

                  {isLastStep ? (
                    <button
                      form="inquiryForm"
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-[var(--radius-md)] flex items-center justify-center gap-3 hover:bg-hover transition-all shadow-xl hover:-translate-y-1 disabled:opacity-50"
                    >
                      {isLoading ? <Loader className="animate-spin" size={20} /> : <><span className="font-black uppercase text-[11px] tracking-widest">Finalize Request</span> <ArrowUpRight size={20} /></>}
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-[var(--radius-md)] flex items-center justify-center gap-3 hover:bg-hover transition-all shadow-xl hover:-translate-y-1"
                    >
                      <span className="font-black uppercase text-[11px] tracking-widest">
                        {isSummaryStep ? "Go to Contact" : "Continue"}
                      </span>
                      <ChevronRight size={18} />
                    </button>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* --- TOAST NOTIFICATION --- */}
        {message && (
          <div className={`fixed bottom-8 right-8 p-6 rounded-[var(--radius-md)] shadow-2xl z-[100] flex items-center gap-4 animate-slideUp border-l-8
            ${message.type === "success" ? "bg-white border-green-500 text-primary" : "bg-primary border-red-500 text-white"}`}>
            <div className="flex-grow">
              <p className="text-xs font-black uppercase tracking-widest mb-1">{message.type}</p>
              <p className="font-bold">{message.text}</p>
            </div>
            <button onClick={() => setMessage(null)} className="opacity-50 hover:opacity-100 transition-opacity">
              <X size={20} />
            </button>
          </div>
        )}
      </div>


      <style >{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </>
  );
}