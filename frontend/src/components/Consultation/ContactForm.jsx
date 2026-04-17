import SecondaryButton from "../Common/Button/SecondaryButton";
import { Heading2, RichParagraph } from '../Common/Common'

export default function ContactForm({ formData, handleChange, handleSubmit, loading }) {
  return (
    <div className="bg-white p-8 md:p-12 rounded-lg border border-primary/5 shadow-sm flex flex-col items-center">
      <div className="max-w-2xl mb-10 text-center">
        <Heading2 text="Let’s Connect" />
        <RichParagraph className="mt-2">
          Tell us what’s on your mind! Whether it’s a project idea or a quick question, we’re here to help.
        </RichParagraph>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--gap-sm)]">
          {["name", "email", "phone"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-[11px] font-bold uppercase tracking-wider text-primary/40 mb-2 ml-1">
                {field}
              </label>
              <input
                type={field === "phone" ? "tel" : field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={(e) => {
                  if (field === "phone") {
                    // Sirf numbers allow honge
                    const val = e.target.value.replace(/\D/g, "");
                    // Max limit hum 15 rakh dete hain (international standard)
                    if (val.length <= 15) {
                      handleChange({
                        target: { name: field, value: val }
                      });
                    }
                  } else {
                    handleChange(e);
                  }
                }}
                // --- VALIDATION RULES ---
                required
                // 9 digits par submit nahi hone dega
                minLength={field === "phone" ? 10 : undefined}
                // Sabse zaroori: regex pattern jo check karega kam se kam 10 digits hon
                pattern={field === "phone" ? ".{10,}" : undefined}

                placeholder={field === "phone" ? "Minimum 10 digits" : `Your ${field}`}
                className="w-full p-4 rounded-lg bg-secondary/50 border border-transparent focus:border-hover focus:bg-white focus:outline-none transition-all text-primary"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <label className="text-[11px] font-bold uppercase tracking-wider text-primary/40 mb-2 ml-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="w-full p-4 rounded-lg bg-secondary/50 border border-transparent focus:border-hover focus:bg-white focus:outline-none transition-all text-primary font-sans"
          />
        </div>

        <div className="pt-4 flex justify-center">
          <SecondaryButton
            type="submit"
            disabled={loading}
            label={loading ? "Submitting..." : "Send Message"}
          />
        </div>
      </form>
    </div>
  );
}