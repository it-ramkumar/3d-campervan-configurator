// showQuoteForm.js
import Swal from "sweetalert2";

/**
 * Displays a popup form to collect user quote details (name, email, phone)
 * and returns that data via the `onSubmit` callback.
 */
export const showQuoteForm = (onSubmit) => {
  Swal.fire({
    title: "Get a Quote",
    html: `
      <input type="text" id="swal-name" class="swal2-input" placeholder="Your Name" />
      <input type="email" id="swal-email" class="swal2-input" placeholder="Email" />
      <input type="tel" id="swal-phone" class="swal2-input" placeholder="Phone " />
    `,
    confirmButtonText: "Submit",
    showCancelButton: true,
    customClass: {
    confirmButton: "my-confirm-btn",
    cancelButton: "my-cancel-btn",
  },
  buttonsStyling: false,
  focusConfirm: false,

    preConfirm: () => {
      const name = document.getElementById("swal-name").value.trim();
      const email = document.getElementById("swal-email").value.trim();
      const phone = document.getElementById("swal-phone").value.trim();

      // Basic email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Basic phone regex (10-15 digits, allows spaces, dashes, parentheses, and plus)
      const phoneRegex = /^[\d\s\-()+]{10,15}$/;

      if (!name || !email || !phone) {
        Swal.showValidationMessage("Name, email, and phone are required.");
        return false;
      }
      if (!emailRegex.test(email)) {
        Swal.showValidationMessage("Please enter a valid email address.");
        return false;
      }
      if (!phoneRegex.test(phone)) {
        Swal.showValidationMessage("Please enter a valid phone number.");
        return false;
      }

      return { name, email, phone };
    },
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      try {
        onSubmit(result.value); // Pass data back to the caller
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Submission Error",
          text: "Something went wrong while handling your form data.",
        });
        console.error("Error during form submission handler:", err);
      }
    }
  });
};
