// showQuoteForm.js
import Swal from "sweetalert2";

export const showQuoteForm = (onSubmit) => {
  Swal.fire({
    title: "Get a Quote",
    html: `
      <input type="text" id="swal-name" class="swal2-input" placeholder="Your Name" />
      <input type="email" id="swal-email" class="swal2-input" placeholder="Email" />

      <div style="display:flex; align-items:center; margin-top:15px;">
        <select id="swal-country"
                style="width:95px; height:40px;">
          <option value="+1">🇺🇸 +1</option>
          <option value="+44">🇬🇧 +44</option>
          <option value="+92" selected>🇵🇰 +92</option>
          <option value="+61">🇦🇺 +61</option>
          <option value="+971">🇦🇪 +971</option>
          <option value="+91">🇮🇳 +91</option>
          <option value="+81">🇯🇵 +81</option>
          <option value="+49">🇩🇪 +49</option>
          <option value="+33">🇫🇷 +33</option>
          <option value="+39">🇮🇹 +39</option>
        </select>
        <input type="tel" id="swal-phone"
               class="swal2-input"
               placeholder="Phone"

               style="flex:; height:54px; margin:0; border-radius:5px; width:263px; " />
      </div>
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
      const country = document.getElementById("swal-country").value;

      // Basic email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Basic phone regex (7–15 digits, allows spaces, dashes, parentheses)
    const phoneRegex = /^\+?[0-9\s()\-]{7,15}$/;


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

      return { name, email, phone: country + phone };
    },
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      try {
        onSubmit(result.value);
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
