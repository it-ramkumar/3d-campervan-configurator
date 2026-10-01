export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Returns { field: message } for every invalid field; empty object when valid.
export const validateLead = ({ name, email, phone } = {}, { requirePhone = false } = {}) => {
  const errors = {};

  if (!String(name || "").trim()) errors.name = "Please enter your name.";

  const cleanEmail = String(email || "").trim();
  if (!cleanEmail) errors.email = "Please enter your email address.";
  else if (!EMAIL_REGEX.test(cleanEmail)) errors.email = "Please enter a valid email address.";

  const digits = String(phone || "").replace(/\D/g, "");
  if (!digits) {
    if (requirePhone) errors.phone = "Please enter your phone number.";
  } else if (digits.length < 7 || digits.length > 15) {
    errors.phone = "Please enter a valid phone number.";
  }

  return errors;
};
